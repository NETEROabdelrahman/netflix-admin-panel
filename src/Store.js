import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducers/usersSlice'
import listsReducer from './reducers/listSlice'
import moviesReducer from './reducers/movieSlice'


export const store = configureStore({
    reducer: {
        users: usersReducer,
        lists: listsReducer,
        movies:moviesReducer
    }
})