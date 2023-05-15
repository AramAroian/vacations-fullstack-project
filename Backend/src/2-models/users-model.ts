class UsersModel {
  public usersId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public authLevel: string;

  public constructor(userModel: UsersModel) {
    this.usersId = userModel.usersId;
    this.firstName = userModel.firstName;
    this.lastName = userModel.lastName;
    this.email = userModel.email;
    this.password = userModel.password;
    this.authLevel = userModel.authLevel;
  }
}

export default UsersModel;
