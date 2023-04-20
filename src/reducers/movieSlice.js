import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
export const movies_URL = 'https://api-x920.onrender.com/movies'
export const user = true;

const initialState = {
    movies: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    
    const response = await axios.get(`${movies_URL}`, {
        headers: {
            token:`bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
    })
    
    return response.data
})
export const deleteMovies = createAsyncThunk('movies/deleteMovies', async (_id) => {
    
    const response = await axios.delete(`${movies_URL}/${_id}`, {
        headers: {
            token:`bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
    })
    
    return response.data
})
export const updateMovies = createAsyncThunk('movies/updateMovies', async (initialPost) => {
    console.log(initialPost._id)
    console.log(initialPost.theMovie)
    
    const response = await axios.put(`${movies_URL}/${initialPost._id}`,initialPost.theMovie, {
        headers: {
            token:`bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
    })
    console.log(response)
    return response.data
})
export const createMovies = createAsyncThunk('movies/createMovies', async (initialPost) => {
    
    const response = await axios.post(`${movies_URL}`,initialPost, {
        headers: {
            token:`bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
    })
    console.log(response)
    return response.data
})


export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(fetchMovies.pending, (state, action) => {
            state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload
            })
            .addCase(fetchMovies.rejected, (state, action)=>{
                state.status = 'failed';
                state.error=action.error.message
            })
            .addCase(deleteMovies.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                console.log(action.payload)
                state.movies = action.payload
            })
            .addCase(updateMovies.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                const {_id,...data} = action.payload
                console.log(data)
                state.movies = data
            })
            .addCase(createMovies.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                //const {_id,...data} = action.payload
                console.log(action.payload)
                state.movies = action.payload
            })
            
    }
})






export default moviesSlice.reducer;