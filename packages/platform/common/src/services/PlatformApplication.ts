import {Injectable, ProviderScope} from "@tsed/di";
import {IncomingMessage, ServerResponse} from "http";
import {createFakeRawDriver} from "./FakeRawDriver";
import {PlatformHandler} from "./PlatformHandler";
import {PlatformRouter} from "./PlatformRouter";
import {createCallback} from "../utils/createCallback";

declare global {
  namespace TsED {
    // @ts-ignore
    export interface Application {}
  }
}

/**
 * `PlatformApplication` is used to provide all routes collected by annotation `@Controller`.
 *
 * @platform
 */
@Injectable({
  scope: ProviderScope.SINGLETON
})
export class PlatformApplication<App = TsED.Application, Router = TsED.Router> extends PlatformRouter<Router> {
  raw: App;
  rawApp: App;
  declare rawRouter: Router;

  constructor(platformHandler: PlatformHandler) {
    super(platformHandler);
    this.rawApp = this.raw = PlatformApplication.createRawApp() as any;
  }

  protected static createRawApp(): any {
    return createFakeRawDriver();
  }

  getApp(): App {
    return this.raw;
  }

  callback(): (req: IncomingMessage, res: ServerResponse) => Promise<void> {
    return createCallback(this.injector, this.raw as any);
  }
}
