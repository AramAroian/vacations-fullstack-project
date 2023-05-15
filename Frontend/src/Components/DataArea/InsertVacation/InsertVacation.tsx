import "./InsertVacation.css";

interface InsertVacationProps {
	
}

function InsertVacation(props: InsertVacationProps): JSX.Element {
    return (
        <div className="InsertVacation box">
            <form>
                <label>Destination:</label>
                <input type="text" name="destination" required /><br />

                <label>Description:</label>
                <textarea name="description" required></textarea><br />

                <label>Start Date:</label>
                <input type="date" name="startDate" required /><br />

                <label>End Date:</label>
                <input type="date" name="endDate" required /><br />

                <label>Price:</label>
                <input type="number" name="price" required /><br />

                <label>Image:</label>
                <input type="file" name="image" accept="image/*" required /><br />

                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default InsertVacation;
