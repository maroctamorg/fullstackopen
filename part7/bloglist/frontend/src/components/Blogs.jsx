import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title} {blog.author}
                        </Link>
                    </li>
                ))}
            </ul>
            <Toggable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm addNewBlog={handleCreate} />
            </Toggable>
        </div>
    )
}

export default Blogs
