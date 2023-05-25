import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UsersModel from "../../../Models/UsersModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

  const { register, handleSubmit } = useForm<UsersModel>();
  const navigate = useNavigate();

  async function send(user: UsersModel) {
    try {
      await authService.register(user);
      notifyService.success("Welcome");
      navigate("/vacations");
    } catch (err: any) {
      notifyService.error(err)
    }
  }

  return (
    <div className="Register box">
      <form onSubmit={handleSubmit(send)}>
        <h2>Register</h2>
        <label>First name:</label>
        <input type="text" {...register("firstName")} />

        <label>Last name:</label>
        <input type="text" {...register("lastName")} />

        <label>E-mail:</label>
        <input type="text" {...register("email")} />

        <label>Password:</label>
        <input type="password" {...register("password")} />

        <button className="register-button">Register</button>
      </form>
      <div className="form-footer">
        already a member?<br />
        <NavLink to="/login">sign up</NavLink>
      </div>
    </div>
  );
}

export default Register;
