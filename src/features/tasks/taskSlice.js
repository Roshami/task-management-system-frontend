import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

// add task
export const createTask = createAsyncThunk(
  'myTasks/addTask',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/api/tasks/addtask`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// fetch tasks
export const fetchTasks = createAsyncThunk('myTasks', async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/api/tasks/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Failed to fetch tasks');
  }
});

// update task
export const updateTask = createAsyncThunk(
  'myTasks',
  async ({ id, updated }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/api/tasks/${id}`, updated, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// delete task
export const deleteTask = createAsyncThunk(
  'myTasks',
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      console.log('id', id);
      const response = await axios.delete(`${API_URL}/api/tasks/${id.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    searchTerm: '',
    statusFilter: 'All',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // add tasks
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // fetch tasks
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      
  },
});

export const { setSearchTerm, setStatusFilter } = tasksSlice.actions;

export const selectFilteredTasks = (state) => {
  const search = state.tasks.searchTerm.toLowerCase();
  const status = state.tasks.statusFilter;

  return state.tasks.tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search);

    const matchesStatus =
      status === 'All' || task.status.toLowerCase() === status.toLowerCase();

    return matchesSearch && matchesStatus;
  });
};


export default tasksSlice.reducer;
