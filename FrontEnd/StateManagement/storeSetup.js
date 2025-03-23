import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'; // You'll create this
import taskReducer from '../slices/taskSlice'; // You'll create this

export const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
    },
});
