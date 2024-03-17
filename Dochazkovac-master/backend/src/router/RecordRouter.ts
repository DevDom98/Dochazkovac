import { Server } from '@hapi/hapi';
import RecordManager from '../model/RecordManager';
import ARouter from './ARouter';

export default class RecordRouter extends ARouter {
  constructor(private _recordManager: RecordManager) {
    super();
  }

  public createRoutes(server: Server): void {
    server.route({
      method: 'POST',
      path: '/records',
      handler: this._wrappedHandler(async (request) => this._recordManager.create(request.payload)),
    });

    server.route({
      method: 'GET',
      path: '/records',
      handler: this._wrappedHandler(async () => this._recordManager.get()),
    });
  }
}
