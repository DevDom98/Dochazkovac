import User from '../database/entity/User'
import UserRepository from "../database/repository/UserRepository";

export default class UserManager {
    constructor(private _repo: UserRepository, private _userRepo: UserRepository) {
    }   
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    public async create(data: any): Promise<User> {
        if (!data.email) {
          throw new Error('Email není');
        }
        if (!data.password) {
          throw new Error('Password  není');
        }
        const user = await this._userRepo.getUser(data.id_project);

        const newUser = new User();
        newUser
          .setName(data.name)
          .setSurname(data.surname)
          .setEmail(data.email)
          .setPassword(data.password)
        return this._repo.create(newUser);
      }    

      public async get(id:number): Promise<User> {
      const user = await this._repo.getUser(id);
      if(!user){
        throw new Error('Uživatel není')
      }
      user.setPassword('');
      return user;
      }

      public async login(data:any): Promise<User>{
        if(!data.email){
          throw new Error();
        }const email = data.email;
        if(!data.password){
          throw new Error()
        }const password = data.password;



        const user = await this._repo.findByUserName(email)
        if(!user){
          throw new Error()
        } 
        if(user.getPassword()=== password){
          return user;
        }throw new Error('Přihlášení se nezdařilo');

      }
      //novou routu
      //manager login funkce //find by metodu
}