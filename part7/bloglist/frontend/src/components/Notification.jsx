import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    return notification?.message !== null ? (
        <div className={notification.type}>{notification.message}</div>
    ) : null
}

export default Notification
