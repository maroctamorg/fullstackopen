import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { likeBlog, deleteBlog, addBlogComment } from '../reducers/blogReducer'

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

    const handleRemove = () => {
        if (!window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
            return
        }

        dispatch(deleteBlog(blog))
        navigate('/')
    }

    const handleAddComment = (event) => {
        event.preventDefault()
        const comment = event.target.comment.value

        dispatch(addBlogComment(blog, comment))
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
                    added by {blog.user.username} <br />
                    <button onClick={handleRemove}>remove</button>
                </p>
            </div>
            <h4>comments</h4>
            <form onSubmit={handleAddComment}>
                <input type="text" name="comment" />
                <button type="submit">add comment</button>
            </form>
            <ul>
                {blog.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

export default Blog
