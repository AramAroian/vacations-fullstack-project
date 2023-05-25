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
            setTimeout(() => authService.logout(), 1800000); //30*60*1000
        } catch (err: any) {
            notifyService.error(err)
        }
    }


    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    return (
        <div className="Login box">
            <form onSubmit={handleSubmit(send)}>
                <h2>Login</h2>
                <label>E-mail:</label>
                <input type="text" {...register("email")} />

                <label>Password:</label>
                <input type="password" {...register("password")} />

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
