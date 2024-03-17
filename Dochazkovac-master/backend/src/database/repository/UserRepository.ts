import Client from "../Client";
import User from '../entity/User';

export default class UserRepository {
    constructor(private _em: Client){
    }
    public async create(user: User): Promise<User> {
        const conn = await this._em.getConnection();
        await conn?.persist(user);

        return user;
    }
    public async getUser(id: number): Promise<User |null> {
        const conn = await this._em.getConnection();
        return conn?.query(User).filter({id}).findOne() ?? null;
      }
    public async findByUserName(userName: string): Promise <User |null>{
        const conn = await this._em.getConnection();
        return conn?.query(User).filter({email:userName}).findOne() ?? null;
    }
}