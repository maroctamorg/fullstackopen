import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { likeBlog, deleteBlog, addBlogComment } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

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
                    <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={handleLike}
                    >
                        like
                    </Button>{' '}
                    <br />
                    added by {blog.user.username} <br />
                    <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={handleRemove}
                    >
                        remove
                    </Button>
                </p>
            </div>
            <h4>comments</h4>
            <Form
                onSubmit={handleAddComment}
                className="mb-2"
                style={{ maxWidth: 480 }}
            >
                <Form.Group className="mb-2" controlId="commentInput">
                    <Form.Control
                        type="text"
                        name="comment"
                        placeholder="Write a comment"
                    />
                </Form.Group>
                <Button size="sm" type="submit">
                    add comment
                </Button>
            </Form>
            <ul>
                {blog.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

export default Blog
