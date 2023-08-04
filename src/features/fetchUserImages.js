import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getImages = createAsyncThunk('user/images', async() => {
    const token = localStorage.getItem("token")
 const response = await axios.get('http://localhost:3001/post/images', {
    headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`
    }
 })
 return response.data
})


const initialState = {
    images: [], 
    loading: false, 
    error: false
}

export const getUserImages = createSlice({
name: 'userImages', 
initialState, 
reducers: {}, 
extraReducers: (builder) => {
    builder 
    .addCase(getImages.pending, (state) => {
        state.loading = true
    })
    .addCase(getImages.fulfilled, (state, action) => {
     state.loading = false, 
     state.images = action.payload
    }) 
    .addCase(getImages.rejected, (state, action) => {
        state.loading = false,  
        state.error = action.error.message
    })
}
})  


export default getUserImages.reducer


