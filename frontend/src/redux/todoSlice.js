import axios from 'axios'
import { useContext } from 'react';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import {createSlice} from '@reduxjs/toolkit'


const getTodosFromDB = async() => {
    const {backendUrl} = useContext(AppContent);
    axios.defaults.withCredentials = true;
    const {todos} = axios.get(backendUrl + "/api/user/your-todos");
    try {
        return todos ? JSON.parse(todos) : [];
    } catch (error) {
        toast.error("Error parsing pastes from Db" , error);
        return [];
    }
}

const initialState = {
    todos : getTodosFromDB()
};

export const todoSlice = createSlice({
    name : 'todos',
    initialState,
    reducers : {
        getTodos : (state, action) => {
            const todo = action.payload;
            state.todos.push(todo);
            const 
        }
    }
})
