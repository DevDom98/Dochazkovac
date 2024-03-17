import {
  Lifecycle, Request, ResponseToolkit, Server,
} from '@hapi/hapi';
import AuthorizeException from '../exception/AuthorizeException';

export default abstract class ARouter {
    public abstract createRoutes(server: Server): void;

    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any,max-len
    protected _wrappedHandler = (c: (r: Request) => any): Lifecycle.Method => async (r: Request, h: ResponseToolkit) => {
      try {
        return h.response(await c(r));
      } catch (e) {
        if (e instanceof Error) {
          return h.response({ status: 'Error', message: e.message }).code(400);
        }
        if (e instanceof AuthorizeException) {
          return h.response({ status: 'Error', message: e.message }).code(401);
        }

        return h.response({ status: 'Error', message: 'Unknown error' }).code(500);
      }
    };
}
