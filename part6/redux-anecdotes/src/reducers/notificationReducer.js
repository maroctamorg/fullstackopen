import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        unsetNotification() {
            return null
        }
    }
})

let timeoutId = null

export const setNotificationWithTimeout = (message, timeout = 5000) => {
    return async dispatch => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        dispatch(setNotification(message))
        timeoutId = setTimeout(() => {
            dispatch(unsetNotification())
        }, timeout)
    }
}

export const { setNotification, unsetNotification } = notificationSlice.actions
export default notificationSlice.reducer