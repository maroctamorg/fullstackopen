import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
    case 'SET_NOTIFICATION':
        return action.data
    case 'CLEAR_NOTIFICATION':
        return null
    default:
        return state
    }
}

const NotificationContext = createContext()

// eslint-disable-next-line react/prop-types
export const NotificationContextProvider = ({ children }) => {
    const [ notification, notificationDispatcher ] = useReducer(notificationReducer, null)

    const clearNotification = () => {
        notificationDispatcher({ type: 'CLEAR_NOTIFICATION' })
    }

    const setNotification = (notification) => {
        notificationDispatcher({ type: 'SET_NOTIFICATION', data: notification })
        setTimeout(() => {
            clearNotification()
        }, 5000)
    }

    return (
        <NotificationContext.Provider value={[ notification, setNotification, clearNotification ]}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const [notification] = useContext(NotificationContext)
    return notification
}

export const useSetNotification = () => {
    const [, setNotification] = useContext(NotificationContext)
    return setNotification
}



export default NotificationContext