import { NavLink } from "react-router-dom";
import VacationsModel from "../../../Models/VacationsModel";
import "./VacationsCard.css";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import { useState, useEffect } from "react";
import UsersModel from "../../../Models/UsersModel";
import { authStore } from "../../../Redux/AuthState";

interface VacationsCardProps {
  vacation: VacationsModel;
  onDeleteVacation: (vacationsId: number) => void;
}

function VacationsCard(props: VacationsCardProps): JSX.Element {

  const [user, setUser] = useState<UsersModel>();

  useEffect(() => {
    setUser(authStore.getState().user);
  }, []);

  async function deleteVacation(vacationsId: number) {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this vacation?");
      if (confirmDelete) {
        await vacationsService.deleteVacation(vacationsId);
        props.onDeleteVacation(vacationsId);
        notifyService.success("Vacation was successfuly deleted");
      }
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="VacationsCard box">
      <div className="card">
        <div className="image-container">
          <img src={props.vacation.imageUrl} alt="Destination Image"></img>
        </div>
        {user?.authLevel === 'user' &&
          <div className="card-top-right">
            <button className="like-button">Like 0</button>
          </div>
        }
        {user?.authLevel === 'admin' &&
          <div className="card-top-left">
            <NavLink to={"edit/" + props.vacation.vacationsId}>
              <button className="edit-button">Edit</button>
            </ NavLink>
            <NavLink to="#" onClick={() => deleteVacation(props.vacation.vacationsId)}>
              <button className="delete-button">Delete</button>
            </NavLink>
          </div>
        }
        <div className="card-body">
          <h2 className="destination-name">{props.vacation.destination}</h2>
          <p className="vacation-dates">
            {props.vacation.startDate} - {props.vacation.endDate}
          </p>
          <div className="vacation-description">
            <p>{props.vacation.description}</p>
          </div>
        </div>
        <div className="card-bottom">
          <button className="purchase-button">$ {props.vacation.price}</button>
        </div>
      </div>
    </div>
  );
}

export default VacationsCard;
