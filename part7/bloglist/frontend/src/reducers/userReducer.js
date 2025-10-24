import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import {
    setNotificationWithTimeout,
    NOTIFICATION_TYPE,
} from './notificationReducer'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        unsetUser() {
            return null
        },
    },
})

export const initializeUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch(setUser(user))
        }
    }
}

export const loginUser = (credentials) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login(credentials)
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(setUser(user))
        } catch (e) {
            dispatch(
                setNotificationWithTimeout(
                    'wrong username or password',
                    NOTIFICATION_TYPE.ERROR
                )
            )
        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('loggedBlogappUser')
        blogService.setToken(null)
        dispatch(unsetUser())
    }
}

export const { setUser, unsetUser } = userSlice.actions
export default userSlice.reducer
