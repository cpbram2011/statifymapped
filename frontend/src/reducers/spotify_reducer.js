import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import spotifyApi from "../util/spotifyApi";
import billboard from '../util/BillboardHot100'
import viral50 from '../util/Viral50Global'
import hotHits from '../util/HotHitsUSA'

const initialState = {
  target: '',
  time_range: 'short_term',
  validUser: true,
  features: [],
  tracks: [],
  playlists: [],
  loading: true,
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
    let data, trackIds;
    try {
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
          // const newdata = response.items.map(({track}) => {
          //   return {
          //     id: track.id,
          //     name: track.name,
          //     popularity: track.popularity,
          //     artists: track.artists,
          //     duration_ms: track.duration_ms,
          //     album: {
          //       name: track.album.name,
          //       images: [track.album.images[0]],
          //       release_date: track.album.release_date
          //     }
          //   }
          // })
          // data = newdata
          data = response.items.map(item => item.track)
          trackIds = data.map(item => item.id)
        }
        dispatch(receiveTracks({tracks: data, target, time_range}))
        dispatch(fetchFeatures(trackIds))
    } catch (error) {
      let features = []
      dispatch(invalidateUser())
      if ( target === '37i9dQZEVXbLiRSasKsNU9') {
        data = viral50.tracks
        features = viral50.features
        trackIds = data.map(item => item.id)
      } 
      else if ( target === '6UeSakyzhiEt4NB3UAd6NQ') {
        data = billboard.tracks
        features = billboard.features
        trackIds = data.map(item => item.id)
      } 
      else if ( target === '37i9dQZF1DX0kbJZpiYdZl') {
        data = hotHits.tracks
        features = hotHits.features
        trackIds = data.map(item => item.id)
      } 
      else {
        data = []
        trackIds = []
      }
      dispatch(receiveTracks({tracks: data, target, time_range}))
      dispatch(receiveFeatures(features))
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
      // console.log('fetchFeatures err', error)
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
    },
    invalidateUser: (state) => {
      state.validUser = false
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

export const { loading, receiveTracks, receiveFeatures, invalidateUser } = spotifySlice.actions
export default spotifySlice.reducer