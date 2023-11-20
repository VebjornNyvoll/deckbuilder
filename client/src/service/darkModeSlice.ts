import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface DarkModeState {
    darkMode: boolean
}

const initialState: DarkModeState = {darkMode: false}

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggle: (state) => {
            state.darkMode = !state.darkMode
        }
    }
})

export const { toggle } = darkModeSlice.actions

export const selectDarkMode = (state: RootState) => state.darkMode.darkMode

export default darkModeSlice.reducer