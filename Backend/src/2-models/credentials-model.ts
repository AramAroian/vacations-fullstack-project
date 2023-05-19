class CredntialsModel {
  public email: string;
  public password: string;

  public constructor(user: CredntialsModel) {
    this.email = user.email;
    this.password = user.password;
  }
}

export default CredntialsModel;
