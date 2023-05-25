import React, { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationsModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import VacationsCard from "../VacationsCard/VacationsCard";
import vacationsService from "../../../Services/VacationsService";
import { vacationsStore } from "../../../Redux/VacationsState";
import UsersModel from "../../../Models/UsersModel";
import { authStore } from "../../../Redux/AuthState";
import { NavLink } from "react-router-dom";
import FollowersModel from "../../../Models/FollowersModel";
import followService from "../../../Services/FollowService";
import { followersStore } from "../../../Redux/FollowState";

function VacationsList(): JSX.Element {

  const [user, setUser] = useState<UsersModel>();

  useEffect(() => {
    setUser(authStore.getState().user);
  }, []);

  // Getting vacations
  const [vacations, setVacations] = useState<VacationsModel[]>([]);

  useEffect(() => {
    vacationsService
      .getAllVacations()
      .then((dbVacations) => setVacations(dbVacations))
      .catch((err) => notifyService.error(err));

    const unsubscrube = vacationsStore.subscribe(() => {
      setVacations(vacationsStore.getState().vacations);
    });
    return () => unsubscrube();
  }, []);

  const handleDeleteVacation = (vacationsId: number) => {
    setVacations((prevVacations) => prevVacations.filter((v) => v.vacationsId !== vacationsId));
  };


  return (
    <div className="VacationsList">
      {user?.authLevel === 'admin' &&
        <div className="add-button-div">
          <NavLink to="/vacations/new">
            <button className="add-button">+ New Vacation</button>
          </ NavLink>
        </div>
      }
      {user?.authLevel === 'user' &&
        <div>
          <label>
            <input
              type="checkbox"
              name="followed"
            // checked={filters.followed}
            // onChange={handleCheckboxChange}
            />
            Followed
          </label>

          <label>
            <input
              type="checkbox"
              name="ongoing"
            // checked={filters.ongoing}
            // onChange={handleCheckboxChange}
            />
            Ongoing
          </label>

          <label>
            <input
              type="checkbox"
              name="future"
            // checked={filters.future}
            // onChange={handleCheckboxChange}
            />
            Future
          </label>
        </div>
      }
      {vacations.map((v) => (
        <VacationsCard key={v.vacationsId} vacation={v} onDeleteVacation={handleDeleteVacation} />
      ))}
    </div>
  );
}

export default VacationsList;
