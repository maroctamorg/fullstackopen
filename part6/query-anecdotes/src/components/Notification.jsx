import { useNotification } from '../context/NotificationContext'

const Notification = () => {
    const notification = useNotification()

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }
    return notification
        ? (
            <div style={style}>
                {notification}
            </div>
        )
        : null
}

export default Notification
