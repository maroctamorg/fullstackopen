import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    if (!notification || notification.message === null) return null

    const variant = notification.type === 'error' ? 'danger' : 'success'
    return (
        <Alert variant={variant} className="my-2">
            {notification.message}
        </Alert>
    )
}

export default Notification
