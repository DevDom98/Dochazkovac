import {
    Server,
  } from '@hapi/hapi';
  import UserManager from '../model/UserManager';
  import ARouter from './ARouter';
  
  export default class UserRouter extends ARouter {
    constructor(private _userManager: UserManager) {
      super();
    }
  
    public createRoutes(server: Server): void {
      server.route({
        method: 'POST',
        path: '/users',
        handler: this._wrappedHandler(async (request) => this._userManager.create(request.payload)),
      });
      server.route({
        method: 'GET',
        path: '/users/:id',
        handler: this._wrappedHandler(async (request) => this._userManager.get(request.params.id)),
      });
      server.route({
        method: 'POST',
        path: '/users/login',
        handler: this._wrappedHandler(async (request) => this._userManager.login(request.payload)),
      });
    }
  }
  