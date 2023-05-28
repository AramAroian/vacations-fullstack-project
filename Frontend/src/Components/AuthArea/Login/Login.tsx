import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";
import authService from "../../../Services/AuthService";
import CredentialsModel from "../../../Models/CredentialsModel";

function Login(): JSX.Element {

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome Back");
            navigate("/vacations");
            setTimeout(() => authService.logout(), 1800000); //30*60*1000   1800000
        } catch (err: any) {
            notifyService.error(err)
        }
    }


    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    return (
        <div className="Login box">
            <form onSubmit={handleSubmit(send)}>
                <h2>Login</h2>
                <label>E-mail:</label>
                <input type="text"   {...register("email", {
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
                        minLength: {
                            value: 4,
                            message: "Password must be at least 4 characters long"
                        }
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}

                <button className="login-button">Login</button>
            </form>
            <div className="form-footer">
                don't have an account?<br />
                <NavLink to="/register">sign up</NavLink>
            </div>
        </div>
    );
}

export default Login;
