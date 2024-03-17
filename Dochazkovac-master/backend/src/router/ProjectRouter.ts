import {
  Server,
} from '@hapi/hapi';
import ProjectManager from '../model/ProjectManager';
import ARouter from './ARouter';

export default class ProjectRouter extends ARouter {
  constructor(private _projectManager: ProjectManager) {
    super();
  }

  public createRoutes(server: Server): void {
    server.route({
      method: 'POST',
      path: '/projects',
      handler: this._wrappedHandler(async (request) => this._projectManager.create(request.payload)),
    });
    server.route({
      method: 'GET',
      path: '/projects',
      handler: this._wrappedHandler(async () => this._projectManager.get()),
    });
  }
}
