import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UsersModel from "../../../Models/UsersModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

  const { register, handleSubmit, formState: { errors } } = useForm<UsersModel>();
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
        <input type="text" {...register("firstName", {
          required: "First name is required",
          minLength: { value: 2, message: "First name must be at least 2 characters long" },
          maxLength: { value: 30, message: "First name cannot exceed 30 characters" }
        })} />
        {errors.firstName && <p>{errors.firstName.message}</p>}

        <label>Last name:</label>
        <input type="text" {...register("lastName", {
          required: "Last name is required",
          minLength: { value: 2, message: "Last name must be at least 2 characters long" },
          maxLength: { value: 30, message: "Last name cannot exceed 30 characters" }
        })} />
        {errors.lastName && <p>{errors.lastName.message}</p>}

        <label>E-mail:</label>
        <input
          type="text"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label>Password:</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 4, message: "Password must be at least 4 characters long" }
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

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
