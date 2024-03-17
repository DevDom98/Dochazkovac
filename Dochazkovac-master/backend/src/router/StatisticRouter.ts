import { Server } from '@hapi/hapi';
import StatisticManager from '../model/StatisticManager';
import ARouter from './ARouter';

export default class StatisticRouter extends ARouter {
  constructor(private _statisticManager: StatisticManager) {
    super();
  }

  public createRoutes(server: Server) {
    server.route({
      method: 'GET',
      path: '/statistics/money-count',
      handler: this._wrappedHandler(async () => this._statisticManager.getMoneyCount()),
    });
    server.route({
      method: 'POST',
      path: '/statistics/month-pay',
      handler: this._wrappedHandler(async (req) => this._statisticManager.getMonthPay(req.payload)),
    });
  }
}
