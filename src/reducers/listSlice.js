import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
export const LISTS_URL = 'https://api-x920.onrender.com/list'
export const user = true;

const initialState = {
    lists: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

//get all lists
export const fetchlists = createAsyncThunk('lists/fetchlists', async () => {
    const response = await axios.get(LISTS_URL, {
        headers: {
            token:`bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
    })
    return response.data
})

//delete list 
export const deletelists = createAsyncThunk('lists/deletelists', async (_id) => {
    const response = await axios.delete(`${LISTS_URL}/${_id}`, {
        headers: {
            token:`bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
    })
    return response.data
})

//update list
export const updatelists = createAsyncThunk('lists/updatelists', async (initialPost) => {
    const response = await axios.put(`${LISTS_URL}/${initialPost.id}`,initialPost.theList, {
        headers: {
            token:`bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
    })
    return response.data
})


//create list
export const createlists = createAsyncThunk('lists/createlists', async (initialPost) => {
    const response = await axios.post(`${LISTS_URL}`,initialPost, {
        headers: {
            token:`bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
    })
    return response.data
})


export const listsSlice = createSlice({
    name: 'lists',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(fetchlists.pending, (state, action) => {
            state.status = 'loading';
            })
            .addCase(fetchlists.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.lists = action.payload
            })
            .addCase(fetchlists.rejected, (state, action)=>{
                state.status = 'failed';
                state.error=action.error.message
            })
            .addCase(deletelists.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.lists = action.payload
            })
            .addCase(updatelists.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.lists = action.payload
            })
            .addCase(createlists.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.lists = action.payload
            })
            
    }
})






export default listsSlice.reducer;