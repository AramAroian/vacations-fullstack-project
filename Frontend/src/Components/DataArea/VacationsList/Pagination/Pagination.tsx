import { NavLink } from "react-router-dom";
import "./Pagination.css";

interface PaginationProps {
    cardsPerPage: number
    totalCards: number;
    paginate: (number: number) => void;
}

function Pagination(props: PaginationProps,): JSX.Element {
    const pageNumbers = []

    for (let index = 1; index <= Math.ceil(props.totalCards / props.cardsPerPage); index++) {
        pageNumbers.push(index);
    }

    return (
        <div className="Pagination">
            <nav>
                <ul className="pages-list">
                    {pageNumbers.map((n) => (
                        <li key={n}>
                            <NavLink
                                onClick={() => props.paginate(n)}
                                className="page-link"
                                to={""}
                            >
                                {n}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
