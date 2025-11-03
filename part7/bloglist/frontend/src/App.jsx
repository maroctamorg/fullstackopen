import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
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
        <Router>
            <div>
                <Notification />
                {user === null ? (
                    <Login />
                ) : (
                    <div>
                        <p>{user.username} logged-in</p>
                        <button onClick={logout}>logout</button>
                        <Routes>
                            <Route path="/users" element={<Users />} />
                            <Route path="/users/:id" element={<User />} />
                            <Route path="/" element={<Blogs />} />
                        </Routes>
                    </div>
                )}
            </div>
        </Router>
    )
}

export default App
