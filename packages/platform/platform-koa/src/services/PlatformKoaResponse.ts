import {IncomingEvent, PlatformContext, PlatformResponse} from "@tsed/common";
import Koa from "koa";
import {getStatusMessage} from "@tsed/schema";

const encodeUrl = require("encodeurl");

declare global {
  namespace TsED {
    export interface Response extends Koa.Response {}
  }
}

/**
 * @platform
 * @koa
 */
export class PlatformKoaResponse extends PlatformResponse<Koa.Response> {
  ctx: Koa.Context;

  constructor(event: IncomingEvent, $ctx: PlatformContext) {
    super(event, $ctx);
  }

  get locals() {
    return this.ctx.state;
  }

  hasStatus() {
    // KOA set 404 by default
    return this.statusCode !== 404;
  }

  /**
   * Sets the HTTP status for the response.
   *
   * @param status
   */
  status(status: number) {
    this.getResponse().status = status;

    return this;
  }

  /**
   * Set `Content-Type` response header with `type` through `mime.lookup()`
   * when it does not contain "/", or set the Content-Type to `type` otherwise.
   *
   * Examples:
   *
   *     res.type('.html');
   *     res.type('html');
   *     res.type('json');
   *     res.type('application/json');
   *     res.type('png');
   */
  contentType(contentType: string) {
    this.getResponse().type = contentType;

    return this;
  }

  getHeaders() {
    return this.getResponse().headers;
  }

  /**
   * Send any data to your consumer.
   *
   * This method accept a ReadableStream, a plain object, boolean, string, number, null and undefined data.
   * It choose the better way to send the data.
   *
   * @param data
   */
  body(data: any): this {
    this.getResponse().body = data;

    return this;
  }

  getBody() {
    return this.getResponse().body;
  }

  redirect(status: number, url: string): this {
    status = status || 302;
    // Set location header
    url = this.location(url).get("Location");

    this.body(`${getStatusMessage(status)}. Redirecting to ${url}`);
    this.status(status);
    this.setHeader("Content-Length", Buffer.byteLength(this.getResponse().body));

    if (this.request.method === "HEAD") {
      this.getRes().end();
    } else {
      this.getRes().end(this.getBody());
    }

    return this;
  }

  location(location: string): this {
    // "back" is an alias for the referrer
    if (location === "back") {
      location = this.request.get("Referrer") || "/";
    }

    // set location
    this.getResponse().set("Location", encodeUrl(location));

    return this;
  }
}
