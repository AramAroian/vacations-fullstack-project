import VacationsModel from "../../../Models/VacationsModel";
import "./EditVacation.css";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function EditVacation(): JSX.Element {
  const params = useParams();
  const { register, handleSubmit, setValue } = useForm<VacationsModel>();
  const navigate = useNavigate();
  const [vacation, setVacation] = useState<VacationsModel>();

  useEffect(() => {
    const id = +params.vacationsId;
    vacationsService.getVacationById(id)
      .then(dbVacation => {
        const startDate = dbVacation.startDate.split('/').reverse().join('-');
        const endDate = dbVacation.endDate.split('/').reverse().join('-');
        //Passing the values to the form
        setValue("vacationsId", dbVacation.vacationsId);
        setValue("destination", dbVacation.destination);
        setValue("description", dbVacation.description);
        setValue("startDate", startDate);
        setValue("endDate", endDate);
        setValue("price", dbVacation.price);

        setVacation(dbVacation);
        console.log(vacation);
        
      }).catch(err => notifyService.error(err))
  }, []);

  async function send(vacation: VacationsModel): Promise<void> {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];
      console.log(vacation);
      await vacationsService.updateVacation(vacation);
      notifyService.success("Vacation has been updated");
      navigate("/vacations");
    } catch (err) {
      notifyService.error(err);
    }
  }

  return (
    <div className="InsertVacation box">
      <h2>Edit Vacation</h2>
      <form onSubmit={handleSubmit(send)}>
        <input type="hidden" {...register("vacationsId")} />

        <label>Destination:</label>
        <input type="text" {...register("destination")} name="destination" required />
        <br />

        <label>Description:</label>
        <textarea {...register("description")} name="description" required></textarea>
        <br />

        <label>Start Date:</label>
        <input type="date" {...register("startDate")} name="startDate" required />
        <br />

        <label>End Date:</label>
        <input type="date" {...register("endDate")} name="endDate" required />
        <br />

        <label>Price:</label>
        <input type="number" {...register("price")} name="price" required />
        <br />

        <label>Image:</label>
        <input type="file" {...register("image")} name="image" accept="image/*" />
        <img src={vacation?.imageUrl}/>
        <br />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditVacation;
