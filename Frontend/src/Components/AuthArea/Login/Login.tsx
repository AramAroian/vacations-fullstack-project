import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UsersModel from "../../../Models/UsersModel";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<UsersModel>();
    const navigate = useNavigate();
  
    // async function send(user: UsersModel) {
    //   try {
    //     await authService.register(user);
    //     notifyService.success("Welcome");
    //     navigate("/home");
    //   } catch (err: any) {
    //     notifyService.error(err)
    //   }
    // }

    return (
        <div className="Login">
            {/* <form onSubmit={handleSubmit(send)}>
                <h2>Register</h2>
                <label>First name:</label>
                <input type="text" {...register("firstName")} />

                <label>Last name:</label>
                <input type="text" {...register("lastName")} />

                <label>Username:</label>
                <input type="text" {...register("email")} />

                <label>Password:</label>
                <input type="password" {...register("password")} />

                <button>Register</button>
            </form> */}
        </div>
    );
}

export default Login;
