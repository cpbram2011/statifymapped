import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import spotifyApi from "../util/spotifyApi";

const initialState = {
  target: 'top',
  time_range: 'short_term',
  features: [],
  tracks: [],
  playlists: [],
  loading: false,
  error: {}
}

export const fetchPlaylists = createAsyncThunk(
  'spotify/fetchPlaylists', 
  async () => {
    try {
      const res = await spotifyApi.getUserPlaylists({ limit: 50 });
      const data = await res.items
      return data; 
    } catch (error) {
      throw error; 
    }
  }
);

export const setSelected = createAsyncThunk(
  'spotify/setSelected',
  async ({target, time_range = 'short_term'}, {dispatch}) => {

    dispatch(loading(true))
    try {
        let data;
        let trackIds;
        if (target === 'recent') {
          const response = await spotifyApi.getMyRecentlyPlayedTracks({limit: 50})
          data = response.items.map(item => item.track)
          trackIds = data.map(item => item.id)
        }  else if (target === 'top') {
          const response = await spotifyApi.getMyTopTracks({limit: 50, time_range})
          const response2 = await spotifyApi.getMyTopTracks({limit: 50, time_range, offset: 49})
          data = response.items.concat(response2.items)
          trackIds = data.map(item => item.id)
        } else if (target === 'liked') {
          const response = await spotifyApi.getMySavedTracks({limit: 50})
          const response2 = await spotifyApi.getMySavedTracks({limit: 50, offset: 49})
          data = response.items.map(item => item.track).concat(response2.items.map(item => item.track))
          trackIds = data.map(item => item.id)
        } else {
          const response = await spotifyApi.getPlaylistTracks(target)
          data = response.items.map(item => item.track)
          trackIds = data.map(item => item.id)
        }

        dispatch(receiveTracks({tracks: data, target, time_range}))
        dispatch(fetchFeatures(trackIds))
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }
)

const fetchFeatures = createAsyncThunk(
  'spotify/fetchFeatures',
  async (trackIds, {dispatch}) => {
    try {
      const response = await spotifyApi.getAudioFeaturesForTracks(trackIds)
      dispatch(receiveFeatures(response.audio_features))
    } catch (error) {
      throw error
    }
  }
)

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload
    },
    receiveTracks: (state, {payload}) => {
      state.tracks = payload.tracks;
      state.target = payload.target;
      state.time_range = payload.time_range
      state.loading = false
    },
    receiveFeatures: (state, {payload}) => {
      state.features = payload;
      state.loading = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPlaylists.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
      })
  }
})

export const { loading, receiveTracks, receiveFeatures } = spotifySlice.actions
export default spotifySlice.reducer