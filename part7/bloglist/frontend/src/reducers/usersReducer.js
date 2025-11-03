import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
import {
    setNotificationWithTimeout,
    NOTIFICATION_TYPE,
} from './notificationReducer'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
        unsetUsers() {
            return null
        },
    },
})

export const initializeUsers = () => {
    return async (dispatch) => {
        try {
            const users = await usersService.getAll()
            dispatch(setUsers(users))
        } catch (e) {
            dispatch(
                setNotificationWithTimeout(
                    `unable to fetch users: ${e.message}`,
                    NOTIFICATION_TYPE.ERROR
                )
            )
        }
    }
}

export const { setUsers, unsetUsers } = usersSlice.actions
export default usersSlice.reducer
