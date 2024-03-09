import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import spotifyApi from './../util/spotifyApi'
import Axios from './../util/axios'

export const setTokens = createAsyncThunk(
  'spotify/fetchByAccessToken', 
  async ({access_token, refresh_token}) => {
    
    spotifyApi.setAccessToken(access_token)
    let response
    try {
      response = await spotifyApi.getMe()
    } catch (error) {
      if (error.status === 401) {
        Axios.get('http://localhost:8000/refresh_token', { params: { refresh_token: refresh_token } })
          .then(res => {
          window.location.href=`/#/access_token=${res.data.access_token}&refresh_token=${res.data.refresh_token}`
          window.location.reload()
        })
      } else throw error;
    }


    return {
      access_token, 
      refresh_token,
      username: response.display_name,
      profpic: response.images[0] ? response.images[0].url : null
    }
  })


const initialState = {
  isAuthenticated: false,
  access_token: '',
  refresh_token: '',
  username: '',
  profpic: '',
  errors: '',
  loading: false
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.access_token = action.payload
    },
    receiveUserData: (state, action) => {
      return {...state, ...action.payload}
    },
    logout: (state, action) => {
      return {...initialState, errors: action.message}
    }
  },
  extraReducers: builder => {
    builder
      .addCase(setTokens.pending, (state) => {
        state.loading = true
      })
      .addCase(setTokens.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.loading = false
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      state.username = action.payload.username
      state.profpic = action.payload.profpic
    })
  }
})

export const { login, receiveUserData, logout } = sessionSlice.actions
export default sessionSlice.reducer