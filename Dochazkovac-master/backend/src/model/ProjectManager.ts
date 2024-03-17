import Project from '../database/entity/Project';
import ProjectRepository from '../database/repository/ProjectRepository';

export default class ProjectManager {
  constructor(private _repo: ProjectRepository) {

  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public async create(data: any): Promise<Project> {
    if (!data.company_name) {
      throw new Error('Company name není');
    }
    if (!data.project_name) {
      throw new Error('Project name  není');
    }
    if ((!data.hour_pay || data.hour_pay !== typeof Number) && data.hour_pay <= 0) {
      throw new Error('Hour pay  není');
    }

    const newProject = new Project();
    newProject
      .setCompanyName(data.company_name)
      .setProjectName(data.project_name)
      .setHourPay(data.hour_pay);
    return this._repo.create(newProject);
  }

  public async get(): Promise<Project[]> {
    return this._repo.getData();
  }
}
