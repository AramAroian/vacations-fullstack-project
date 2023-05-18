import VacationsModel from "../../../Models/VacationsModel";
import "./InsertVacation.css";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function InsertVacation(): JSX.Element {
  const { register, handleSubmit } = useForm<VacationsModel>();

  const navigate = useNavigate();

  async function send(vacation: VacationsModel): Promise<void> {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];
      console.log(vacation);
      await vacationsService.addVacation(vacation);
      notifyService.success("Vacation has been added");
      navigate("/list");
    } catch (err) {
      notifyService.error(err);
    }
  }

  return (
    <div className="InsertVacation box">
      <form onSubmit={handleSubmit(send)}>
        <label>Destination:</label>
        <input
          type="text"
          {...register("destination")}
          name="destination"
          required
        />
        <br />

        <label>Description:</label>
        <textarea
          {...register("description")}
          name="description"
          required
        ></textarea>
        <br />

        <label>Start Date:</label>
        <input
          type="date"
          {...register("startDate")}
          name="startDate"
          required
        />
        <br />

        <label>End Date:</label>
        <input type="date" {...register("endDate")} name="endDate" required />
        <br />

        <label>Price:</label>
        <input type="number" {...register("price")} name="price" required />
        <br />

        <label>Image:</label>
        <input
          type="file"
          {...register("image")}
          name="image"
          accept="image/*"
          required
        />
        <br />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default InsertVacation;
