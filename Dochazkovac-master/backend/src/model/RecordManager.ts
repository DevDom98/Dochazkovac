import Record from '../database/entity/Record';
import RecordRepository from '../database/repository/RecordRepository';
import ProjectRepository from '../database/repository/ProjectRepository';

export default class RecordManager {
  constructor(private _repo: RecordRepository, private _projectRepo: ProjectRepository) {
  }

  async create(data: any) {
    console.log(data);
    if (!data.date) {
      throw new Error('Date name není');
    }
    if (!data.minute_count) {
      throw new Error('Minute count name není');
    }
    if (!data.id_project) {
      throw new Error('ID projektu není');
    }
    const project = await this._projectRepo.getProject(data.id_project);
    if (!project) {
      throw new Error('Project není');
    }
    const newRecord = new Record();
    newRecord
      .setDate(new Date(data.date))
      .setMinuteCount(data.minute_count)
      .setProject(project);

    return this._repo.create(newRecord);
  }

  public async get(): Promise<Record[]> {
    return this._repo.getData();
  }
}
