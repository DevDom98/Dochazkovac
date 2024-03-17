import { entity, t } from "@deepkit/type";

@entity.name('user')

export default class User{
  @t.number.primary.autoIncrement
    private id = 0;

  @t.string.name('name')
    private name = '';

    @t.string.name('surname')
    private surname = '';

    @t.string.name('email')
    private email = '';

    @t.string.name('password')
    private password = '';

    public setName(name: string): User {
      this.name = name;
      return this;
    }

    public getName(): string {
      return this.name;
    }

    public setSurname(name: string): User {
      this.name = name;
      return this;
    }

    public getSurname(): string {
      return this.name;
    }

    public setEmail(name: string): User {
        this.email = name;
        return this;
      }
  
      public getEmail(): string {
        return this.email;
      }
  
      public setPassword(name: string): User {
        this.password = name;
        return this;
      }
  
      public getPassword(): string {
        return this.password;
      }
}