import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'

const User = () => {
    const users = useSelector((state) => state.users)
    const userId = useParams().id
    const user = userId ? users.find((u) => u.id === userId) : null

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <div>
                <h3>added blogs</h3>
                <ul>
                    {user.blogs.map((blog) => (
                        <li key={blog.id}>{blog.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default User
