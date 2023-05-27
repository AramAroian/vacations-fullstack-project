import "./Spinner.css";
import imageSource from "../../../Assets/Images/five-colors-spinner.gif"

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
			<img src={imageSource} />
        </div>
    );
}

export default Spinner;
