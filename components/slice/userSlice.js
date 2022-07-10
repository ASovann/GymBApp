import { createSlice } from "@reduxjs/toolkit";
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('gymbDB')

const saveUserToDatabase = async (username, password, telephone, mail) => {
    
}

export const userSlice = createSlice({
    name : "user",
    initialState : {
        user: {}
    },
    reducers: {
        setUser : (state, action)  => {
            state.user = action.payload
            saveUserToDatabase(action.payload.username, action.payload.password, action.payload.telephone, action.payload.email)
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer