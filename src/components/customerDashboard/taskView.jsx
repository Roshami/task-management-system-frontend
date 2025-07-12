import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../loadingSpinner";
import { fetchTasks } from "../../features/tasks/taskSlice";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const TaskView = () => {
  const dispatch = useDispatch();
  const { tasks, loadding, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loadding) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <LoadingSpinner />
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-red-500 text-lg font-medium">Error: {error}</p>
    </div>
  );

  const statusColors = {
    Completed: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      dot: 'bg-green-500',
      chart: 'rgb(34, 197, 94)',
    },
    'In Progress': {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      dot: 'bg-amber-500',
      chart: 'rgb(245, 158, 11)',
    },
    Pending: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      dot: 'bg-gray-500',
      chart: 'rgb(156, 163, 175)',
    },
    'On Hold': { 
      bg: 'bg-red-100', 
      text: 'text-red-800', 
      dot: 'bg-red-500',
      chart: 'rgb(239, 68, 68)',
    },
  };

  // Count tasks by status for the sidebar and chart
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(statusColors),
    datasets: [
      {
        data: Object.keys(statusColors).map(status => statusCounts[status] || 0),
        backgroundColor: Object.values(statusColors).map(color => color.chart),
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-6">
        {/* Status sidebar */}
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Task Status</h2>
          <div className="space-y-3">
            {Object.entries(statusColors).map(([status, colors]) => (
              <div 
                key={status}
                className="flex flex-col sm:flex-row items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${colors.dot}`}></div>
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {status.toLowerCase()}
                  </span>
                </div>
                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {statusCounts[status] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart section */}
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Task Distribution</h2>
          <div className="h-80">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskView;