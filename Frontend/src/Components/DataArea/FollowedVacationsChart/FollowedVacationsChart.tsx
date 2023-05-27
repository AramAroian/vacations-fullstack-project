import "./FollowedVacationsChart.css";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import FollowersModel from "../../../Models/FollowersModel";
import VacationsModel from "../../../Models/VacationsModel";
import { authStore } from "../../../Redux/AuthState";
import { followersStore } from "../../../Redux/FollowState";
import { vacationsStore } from "../../../Redux/VacationsState";
import followService from "../../../Services/FollowService";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import UsersModel from "../../../Models/UsersModel";
import { CSVLink } from "react-csv";

Chart.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend
)

type ChartData = {
    labels: string[];
    datasets: CustomChartDataSet[];
}

type CustomChartDataSet = {
    label: string;
    data: number[],
    fill: boolean,
    borderColor: string,
}

type CSVData = {
    Destination: string;
    Followers: number;
};

function FollowedVacationsChart(): JSX.Element {
    const [user, setUser] = useState<UsersModel>();
    const [vacations, setVacations] = useState<VacationsModel[]>([]);
    const [followedVacations, setFollowedVacations] = useState<FollowersModel[]>([]);
    const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });
    const [csvData, setCSVData] = useState<CSVData[]>([]);


    // Getting user from state
    useEffect(() => {
        setUser(authStore.getState().user);
    }, []);

    // Getting vacations and followers data
    useEffect(() => {
        if (user) {
            vacationsService
                .getAllVacations()
                .then((dbVacations) => setVacations(dbVacations))
                .catch((err) => notifyService.error(err));

            followService
                .getAllFollowedVacations()
                .then((dbFollowedVacations) => setFollowedVacations(dbFollowedVacations))
                .catch((err) => notifyService.error(err))

            const unsubscrubeVacations = vacationsStore.subscribe(() => {
                setVacations(vacationsStore.getState().vacations);
            });
            const unsubscrubeFollowed = followersStore.subscribe(() => {
                setFollowedVacations(followersStore.getState().followers);
            });
            return () => {
                unsubscrubeVacations();
                unsubscrubeFollowed();
            }
        }
    }, [user]);

    // Pupilating chart data
    useEffect(() => {
        if (vacations.length > 0 && followedVacations.length > 0) {
            const chartLabels = vacations.map((vacation) => vacation.destination);
            const chartData = vacations.map((vacation) => {
                const followersCount = followedVacations.filter(
                    (followed) => followed.vacationsId === vacation.vacationsId
                ).length;
                return followersCount;
            });

            setChartData({
                labels: chartLabels,
                datasets: [
                    {
                        label: "Followers",
                        data: chartData,
                        fill: false,
                        borderColor: "#3F51B5",
                    },
                ],
            });

            const formatedCSVData = prepareCSVData(chartLabels, chartData);
            setCSVData(formatedCSVData);
        }
    }, [vacations, followedVacations]);

    function prepareCSVData(destination: string[], followers: number[]): Array<{ Destination: string; Followers: number }> {
        return destination.map((label, index) => ({
            Destination: label,
            Followers: followers[index],
        }));
    }

    return (
        <div className="FollowedVacationsChart">
            <div className="chart-container box">
                <Bar data={chartData} />
            </div>

                <CSVLink className="export-btn" data={csvData} filename="followed_vacations.csv">Export to CSV</CSVLink>

        </div>
    );
}

export default FollowedVacationsChart;
