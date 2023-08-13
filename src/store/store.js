import {configureStore} from '@reduxjs/toolkit' 
import getUserImageSlice from '../features/fetchUserImages'  
import UserFollowingSlice from '../features/fetchUserFollowing' 



export const store = configureStore({
    reducer: {
     "userImages": getUserImageSlice,  
     "userFollowing": UserFollowingSlice
    }
})