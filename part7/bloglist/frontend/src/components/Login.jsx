import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const Login = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(loginUser({ username, password }))
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        data-testid="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        data-testid="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login
