import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

import auth from './auth'
import profile from './profile'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth', 'profile']
}

const rootReducer = combineReducers({
  auth,
  profile
})

export default persistReducer(persistConfig, rootReducer)