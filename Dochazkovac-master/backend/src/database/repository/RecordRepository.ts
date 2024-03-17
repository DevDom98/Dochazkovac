import { SqlQuery, SqlQueryParameter } from '@deepkit/sql';
import { DateTime } from 'luxon';
import Client from '../Client';
import Record from '../entity/Record';

const DATE_FORMAT = 'y-MM-dd HH:mm:ss';

export default class RecordRepository {
  constructor(private _em: Client) {

  }

  public async create(record: Record): Promise<Record> {
    const conn = await this._em.getConnection();
    await conn?.persist(record);

    return record;
  }

  public async getData(): Promise<Record[]> {
    const conn = await this._em.getConnection();
    return conn?.query(Record).find() ?? [];
  }

  public async getMoneyCount(): Promise<number> {
    const conn = await this._em.getConnection();
    const result = await conn?.raw(
      new SqlQuery([
        'SELECT SUM(r.minute_count) AS minutes, r.project, p.hour_pay '
          + 'FROM `record` AS r '
          + 'JOIN project AS p ON r.project = p.id '
          + 'GROUP BY r.project ',
      ]),
    ).find();

    let count = 0;
    result.forEach((project: {minutes: number, project: number, hour_pay: number}) => {
      const { minutes } = project;
      const hours = minutes / 60;
      count += hours * project.hour_pay;
    });

    return Math.round(count);
  }

  public async getMonthPay(_date: Date, projectId: string): Promise<number> {
    const conn = await this._em.getConnection();
    const date = DateTime.fromJSDate(_date).set({
      day: 1, hour: 0, minute: 0, second: 0,
    });
    const lastDate = DateTime.fromJSDate(_date).set({
      day: 1, hour: 23, minute: 59, second: 59,
    }).plus({ months: 1 }).minus({ days: 1 });
    const sql = new SqlQuery([
      'SELECT SUM(r.minute_count) AS minutes, p.hour_pay'
      + ' FROM record AS r'
      + ' JOIN project AS p ON r.project = p.id',
      ' WHERE r.date >= ',
      new SqlQueryParameter(date.toFormat(DATE_FORMAT)),
      ' AND r.date <= ',
      new SqlQueryParameter(lastDate.toFormat(DATE_FORMAT)),
      ' AND r.project = ',
      new SqlQueryParameter(projectId),
    ]);
    console.log(sql);
    const result = await conn?.raw(sql).find();

    let monthPay = 0;
    result.forEach((project: {minutes: number, hour_pay: number}) => {
      const hours = project.minutes / 60;
      monthPay = hours * project.hour_pay;
    });
    return monthPay;
  }
}
