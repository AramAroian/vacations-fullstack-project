import { NavLink } from "react-router-dom";
import "./Menu.css";
import { Fragment, useEffect, useState } from "react";
import UsersModel from "../../../Models/UsersModel";
import { authStore } from "../../../Redux/AuthState";

function Menu(): JSX.Element {

  const [user, setUser] = useState<UsersModel>();

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscrube = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscrube();
  }, []);

  return (
    <div className="Menu">
      <NavLink to="/home">Home</NavLink>
      <span> | </span>
      {user ? (
        <NavLink to="/vacations">Vacations</NavLink>
      ) : (
        <NavLink to="/login">Vacations</NavLink>
      )}
      {user && user.authLevel === 'admin' &&
        <Fragment>
          <span> | </span>
          <NavLink to="/vacations/followers-chart">Followed Vacations</NavLink>
        </Fragment>
      }
    </div>
  );
}

export default Menu;
