import { Database } from '@deepkit/orm';
import { MySQLDatabaseAdapter } from '@deepkit/mysql';
import Project from './entity/Project';
import Record from './entity/Record';
import User from './entity/User';

export default class Client {
    private _connection?: Database;

    constructor(
        private _host: string,
        private _port: number,
        private _database: string,
        private _user: string,
        private _password: string,
    ) {
    }

    /**
     * getConnection
     */
    public async getConnection() {
      if (!this._connection) {
        await this.connect();
      }
      return this._connection;
    }

    public async connect(): Promise<Database> {
      const connection = new Database(
        new MySQLDatabaseAdapter(
          {
            database: this._database,
            host: this._host,
            port: this._port,
            user: this._user,
            password: this._password,
          },
        ),
        [Project, Record, User],
      );
      await connection.migrate();
      this._connection = connection;

      return this._connection;
    }
}
