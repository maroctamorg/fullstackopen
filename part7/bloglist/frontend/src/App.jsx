import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Login from './components/Login'
import Notification from './components/Notification'
import { initializeUser, logoutUser } from './reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(initializeUser())
    }, [dispatch])

    const logout = () => {
        dispatch(logoutUser())
    }

    const heroStyle = {
        backgroundColor: '#eee',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    }

    return (
        <div className="container">
            <Notification />
            {user === null ? (
                <Login />
            ) : (
                <div>
                    <div style={heroStyle}>
                        <Link to="/">blogs</Link>
                        <Link to="/users">users</Link>
                        {user.username} logged-in
                        <button onClick={logout}>logout</button>
                    </div>

                    <Routes>
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:id" element={<User />} />
                        <Route path="/blogs/:id" element={<Blog />} />
                        <Route path="/" element={<Blogs />} />
                    </Routes>
                </div>
            )}
        </div>
    )
}

export default App
