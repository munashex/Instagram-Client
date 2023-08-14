import {configureStore} from '@reduxjs/toolkit' 
import getUserImageSlice from '../features/fetchUserImages'  
import UserFollowingSlice from '../features/fetchUserFollowing' 
import UserFollowersSlice from '../features/fetchUserFollowers'



export const store = configureStore({
    reducer: {
     "userImages": getUserImageSlice,  
     "userFollowing": UserFollowingSlice, 
     "userFollowers": UserFollowersSlice
    }
})