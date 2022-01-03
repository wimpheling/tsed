import {InjectorService} from "@tsed/di";
import {IncomingMessage, ServerResponse} from "http";
import {createContext} from "./createContext";

export function createCallback(injector: InjectorService, callback: (request: IncomingMessage, response: ServerResponse) => any) {
  const $ctxInvoke = createContext(injector);

  return async (request: IncomingMessage, response: ServerResponse) => {
    const $ctx = await $ctxInvoke({request, response});

    injector.runInContext($ctx, () => callback(request, response));
  };
}
