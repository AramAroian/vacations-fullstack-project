import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import VacationsList from "../../DataArea/VacationsList/VacationsList";
import InsertVacation from "../../DataArea/InsertVacation/InsertVacation";

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/vacations" element={<VacationsList />} />
      <Route path="/vacations/new" element={<InsertVacation />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;
