import {configureStore} from '@reduxjs/toolkit' 
import getUserImageSlice from '../features/fetchUserImages' 

export const store = configureStore({
    reducer: {
     "userImages": getUserImageSlice
    }
})