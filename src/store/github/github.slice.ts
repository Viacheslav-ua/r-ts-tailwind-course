import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { stringify } from "querystring"

const LS_F_KEY = 'rfk'

interface GithubState {
  favorites: string[]
}

const initialState: GithubState = {
  favorites: JSON.parse(localStorage.getItem(LS_F_KEY) ?? '[]'),
}

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      state.favorites.push(action.payload)
      localStorage.setItem(LS_F_KEY, JSON.stringify(state.favorites))
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(item => item !== action.payload)
      localStorage.setItem(LS_F_KEY, JSON.stringify(state.favorites))
    },
  }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer