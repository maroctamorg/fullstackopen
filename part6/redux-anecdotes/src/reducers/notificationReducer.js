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

export const setNotificationWithTimeout = (dispatch, message, timeout = 5000) => {
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    
    dispatch(setNotification(message))
    timeoutId = setTimeout(() => {
        dispatch(unsetNotification())
    }, timeout)
}

export const { setNotification, unsetNotification } = notificationSlice.actions
export default notificationSlice.reducer