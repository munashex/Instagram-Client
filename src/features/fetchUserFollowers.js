import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'  
import axios from 'axios'



export const getFollowers = createAsyncThunk('/user/followers', async (id) => {
    const token = localStorage.getItem("token")
 const response = await axios.get(`https://instagram-backend-onig.onrender.com/user/followers/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
 }) 
 return response.data
})

const initialState = {
    loading: false, 
    followers: [], 
    error: false
}


export const UserFollowers = createSlice({
    name: 'userFollowers', 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
    builder 
    .addCase(getFollowers.pending, (state) => {
        state.loading = true
    })
    .addCase(getFollowers.fulfilled, (state, action) => {
        state.loading = false 
        state.followers = action.payload 
    })
    .addCase(getFollowers.rejected, (state, action) => {
        state.loading = false 
        state.error = action.error.message
    })
    }
}) 

export default UserFollowers.reducer