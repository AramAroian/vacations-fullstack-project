import "./FollowedVacationsChart.css";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataset } from "chart.js";
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

Chart.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend
)

type ChartDataSet = {
    labels: string[];
    datasets: any[];
}

function FollowedVacationsChart(): JSX.Element {
    const [user, setUser] = useState<UsersModel>();
    const [vacations, setVacations] = useState<VacationsModel[]>([]);
    const [followedVacations, setFollowedVacations] = useState<FollowersModel[]>([]);
    const [chartData, setChartData] = useState<ChartDataSet>({ labels: [], datasets: [] });


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
        // const inpLabels = vacations.map((v)=>v.destination)
        let newChartData: ChartDataset;
        vacations.forEach((v) => {

        });

        // setChartData();
    }, [followedVacations]);


    // Chart data
    // const data = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    //     datasets: [
    //         {
    //             label: 'Sales',
    //             data: [100, 200, 150, 300, 250, 400],
    //             fill: false,
    //             borderColor: 'rgba(75,192,192,1)',
    //         },
    //     ],
    // };


    return (
        <div className="FollowedVacationsChart">
            <div className="chart-container box">
                <Bar data={chartData} />
            </div>
        </div>
    );
}

export default FollowedVacationsChart;
