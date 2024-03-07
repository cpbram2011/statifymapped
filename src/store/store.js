import { configureStore, Tuple } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import spotifyReducer from './../reducers/spotify_reducer.js'
import sessionReducer from './../reducers/session_reducer.js'

const store = configureStore({
    reducer: {
        session: sessionReducer,
        spotify: spotifyReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

})

export default store