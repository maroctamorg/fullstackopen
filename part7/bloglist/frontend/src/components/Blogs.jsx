import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Toggable from './Toggable'
import BlogForm from './BlogForm'
import { initializeBlogs, createBlog } from '../reducers/blogReducer'

const Blogs = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const blogFormRef = useRef()

    const handleCreate = (blogData) => {
        dispatch(createBlog(blogData))
    }

    return (
        <div>
            <h2>blogs</h2>
            <Table striped hover size="sm">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </td>
                            <td>{blog.author}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Toggable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm addNewBlog={handleCreate} />
            </Toggable>
        </div>
    )
}

export default Blogs
