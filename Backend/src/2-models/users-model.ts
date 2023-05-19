class UsersModel {
  public usersId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public authLevel: string;

  public constructor(user: UsersModel) {
    this.usersId = user.usersId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.authLevel = user.authLevel;
  }
}

export default UsersModel;
