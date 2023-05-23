import { Fragment, useEffect, useState } from "react";
import "./AuthMenu.css";
import UsersModel from "../../../Models/UsersModel";
import { authStore } from "../../../Redux/AuthState";
import { NavLink } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<UsersModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscrube = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return () => unsubscrube();
    }, []);

    function logout():void {
        authService.logout();
        notifyService.success("Goodbye");
    }

    return (
        <div className="AuthMenu">
            {!user &&
                <Fragment>
                    <span>Hello Guest | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </Fragment>
            }
            {user &&
                <Fragment>
                    <span>Hello {user.firstName} {user.lastName} | </span>
                    <NavLink to="/home" onClick={logout}>Logout</NavLink>
                </Fragment>
            }
        </div>
    );
}

export default AuthMenu;
