import { SqlQuery } from '@deepkit/sql';
import Client from '../Client';
import Project from '../entity/Project';

export default class ProjectRepository {
  constructor(private _em: Client) {
  }

  public async create(project: Project): Promise<Project> {
    const conn = await this._em.getConnection();
    await conn?.persist(project);

    return project;
  }

  public async getData(): Promise<Project[]> {
    const conn = await this._em.getConnection();
    return conn?.query(Project).find() ?? [];
  }

  public async getProject(id: number): Promise<Project |null> {
    const conn = await this._em.getConnection();
    return conn?.query(Project).filter({id}).findOne() ?? null;
  }
}
