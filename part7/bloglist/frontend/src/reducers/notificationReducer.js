import { createSlice } from '@reduxjs/toolkit'

const TYPE = {
    ERROR: 'error',
    SUCCESS: 'success',
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: { message: null, type: TYPE.ERROR },
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        unsetNotification() {
            return { message: null, type: TYPE.ERROR }
        },
    },
})

let timeoutId = null

export const setNotificationWithTimeout = (message, type, timeout = 5000) => {
    return async (dispatch) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        dispatch(setNotification({ message, type }))
        timeoutId = setTimeout(() => {
            dispatch(unsetNotification())
        }, timeout)
    }
}

export const { setNotification, unsetNotification } = notificationSlice.actions
export const NOTIFICATION_TYPE = TYPE
export default notificationSlice.reducer
