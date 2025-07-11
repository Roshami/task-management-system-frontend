import Calender from '../../components/customerDashboard/calender';
import TaskView from '../../components/customerDashboard/taskView';

const Dashboard = () => {
  return (
    <div className="w-full p-4 flex items-center justify-between">
      <Calender />
      <TaskView />
    </div>
  );
};

export default Dashboard;
