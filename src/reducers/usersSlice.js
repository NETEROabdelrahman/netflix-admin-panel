import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const AUTH_URL = 'https://api-x920.onrender.com/auth'
const USER_URL = 'https://api-x920.onrender.com/users'
let accessToken;
if (localStorage.getItem("user") === "undefined") {
    accessToken = []
} else {
    accessToken =  JSON.parse(localStorage.getItem("user"))
   
}

    
    
    const initialState = {
        users: accessToken||[],
        status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
}
    

//fetch all users
export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', async () => {
    
    const response = await axios.get(`${USER_URL}`, {
        headers: {
            token:`bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
    })
    return response.data
})

//delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (_id) => {
    console.log(_id)
    const response = await axios.delete(`${USER_URL}/${_id}`, {
        headers: {
            token: `bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
})
    return response.data
})


//update user
export const updateUser = createAsyncThunk('users/updateUser', async (initialPost) => {
    console.log(initialPost)
    const response = await axios.put(`${USER_URL}/${initialPost._id}`,initialPost, {
        headers: {
            token: `bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
    })
    console.log(response)
    return response.data
})


//login
export const login = createAsyncThunk('users/login', async (initialPost) => {
    const response = await axios.post(`${AUTH_URL}/login`, initialPost)
    if (response.data.isAdmin) {
        return response.data
    }
})



export const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(fetchAllUsers.pending, (state, action) => {
            state.status = 'loading';
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload
            })
            .addCase(fetchAllUsers.rejected, (state, action)=>{
                state.status = 'failed';
                state.error=action.error.message
            })
            .addCase(deleteUser.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.users = action.payload
            })
            .addCase(updateUser.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                console.log(action.payload)
                state.users = action.payload
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.users = action.payload
                console.log(action.payload)
                localStorage.setItem("user",JSON.stringify(action.payload))
                
            })
    }
})






export default usersSlice.reducer;