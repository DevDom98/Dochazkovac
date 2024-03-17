import { entity, t } from '@deepkit/type';
import Project from './Project';
/* eslint-disable @typescript-eslint/naming-convention */
@entity.name('record')

export default class Record {
    @t.number.primary.autoIncrement
    private id = 0;

    @t
    private date: Date = new Date();

    @t.number.primary
    private minute_count = 0;

    @t.reference()
    public project: Project = new Project();

    public setDate(date: Date): Record {
      this.date = date;
      return this;
    }

    public getDate(): Date {
      return this.date;
    }

    public setMinuteCount(minute_count: number): Record {
      this.minute_count = minute_count;
      return this;
    }

    public getMinuteCount(): number {
      return this.minute_count;
    }

    public setProject(project: Project): Record {
      this.project = project;
      return this;
    }
}
