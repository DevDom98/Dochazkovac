import RecordRepository from '../database/repository/RecordRepository';

export default class StatisticManager {
  constructor(private _repo: RecordRepository) {
  }

  public getMoneyCount = async (): Promise<number> => this._repo.getMoneyCount();

  public getMonthPay = async (body: any): Promise<number> => this._repo.getMonthPay(new Date(body.date), body.project);
}
