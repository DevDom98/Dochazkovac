/* eslint-disable @typescript-eslint/naming-convention */
import { entity, t } from '@deepkit/type';

@entity.name('project')
export default class Project {
    @t.number.primary.autoIncrement
    private id = 0;

    @t.string.name('company_name')
    private company_name = '';

    @t.string.name('project_name')
    private project_name = '';

    @t.number.name('hour_pay')
    private hour_pay = 0;

    public setCompanyName(name: string): Project {
      this.company_name = name;
      return this;
    }

    public getCompanyName(): string {
      return this.company_name;
    }

    public setProjectName(name: string): Project {
      this.project_name = name;
      return this;
    }

    public getProjectName(): string {
      return this.project_name;
    }

    public setHourPay(count: number): Project {
      this.hour_pay = count;
      return this;
    }

    public getHourPay(): number {
      return this.hour_pay;
    }
}
