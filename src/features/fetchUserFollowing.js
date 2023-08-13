import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'  
import axios from 'axios'



export const getFollowing = createAsyncThunk('/user/following', async (id) => {
    const token = localStorage.getItem("token")
 const response = await axios.get(`http://localhost:3001/user/following/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
 }) 
 return response.data
})

const initialState = {
    loading: false, 
    following: [], 
    error: false
}


export const UserFollowing = createSlice({
    name: 'userFollowing', 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
    builder 
    .addCase(getFollowing.pending, (state) => {
        state.loading = true
    })
    .addCase(getFollowing.fulfilled, (state, action) => {
        state.loading = false 
        state.following = action.payload 
    })
    .addCase(getFollowing.rejected, (state, action) => {
        state.loading = false 
        state.error = action.error.message
    })
    }
}) 

export default UserFollowing.reducer