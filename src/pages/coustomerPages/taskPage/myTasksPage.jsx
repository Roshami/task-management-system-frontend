import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DisplayTasks from "./displayTasks";

const MyTasksPage = () => {
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/`)
            .then((res) => {
                setTask(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [loading]);
    return (
        <div className="w-full">
            <h1>MyTasksPage</h1>
            <Link to="/home/myTasks/addTask">
                add tasks
            </Link>
            
            <div>
                <DisplayTasks />
            </div>

        </div>
    )
}

export default MyTasksPage