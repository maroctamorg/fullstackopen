import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = () => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const blog = blogs.find((b) => b.id === id)

    if (!blog) {
        return null
    }
    const handleLike = () => {
        dispatch(likeBlog(blog))
    }

    const handleRemove = async () => {
        if (!window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
            return
        }

        dispatch(deleteBlog(blog))
        navigate('/')
    }

    return (
        <div style={blogStyle}>
            <h3 className="blog-header">
                {blog.title} {blog.author}{' '}
            </h3>
            <div>
                <p className="blog-details">
                    {blog.url} <br />
                    likes{' '}
                    <span data-testid="number-of-likes">{blog.likes}</span>{' '}
                    <button onClick={handleLike}>like</button> <br />
                    {blog.user.username} <br />
                    <button onClick={handleRemove}>remove</button>
                </p>
            </div>
        </div>
    )
}

export default Blog
