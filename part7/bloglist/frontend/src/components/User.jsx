import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'
import { Table } from 'react-bootstrap'

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
                <Table striped hover size="sm">
                    <thead>
                        <tr>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.blogs.map((blog) => (
                            <tr key={blog.id}>
                                <td>{blog.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default User
