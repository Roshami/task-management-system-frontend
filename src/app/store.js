import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/taskSlice';
import userReducer from '../features/users/userSlice';



export const store = configureStore({
  reducer: {
    users : userReducer,
    tasks: tasksReducer,
  },
});
