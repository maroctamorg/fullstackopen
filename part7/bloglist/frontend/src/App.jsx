import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import { initializeUser, logoutUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(initializeUser())
        dispatch(initializeBlogs())
    }, [dispatch])

    const logout = () => {
        dispatch(logoutUser())
    }

    return (
        <div>
            <Notification />
            {user === null ? (
                <Login />
            ) : (
                <div>
                    <p>{user.username} logged-in</p>
                    <button onClick={logout}>logout</button>
                    <Blogs />
                </div>
            )}
        </div>
    )
}

export default App
