import React, { useEffect } from "react";
import "./VacationsList.css";
import VacationsModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import VacationsCard from "../VacationsCard/VacationsCard";
import vacationsService from "../../../Services/VacationsService";
import { vacationsStore } from "../../../Redux/VacationsState";

function VacationsList(): JSX.Element {
  const [vacations, setVacations] = React.useState<VacationsModel[]>([]);

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

  return (
    <div className="VacationsList">
      {vacations.map((v) => (
        <VacationsCard key={v.vacationsId} vacation={v} />
      ))}
    </div>
  );
}

export default VacationsList;
