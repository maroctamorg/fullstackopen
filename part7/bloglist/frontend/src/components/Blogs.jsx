import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import Toggable from './Toggable'
import BlogForm from './BlogForm'
import {
    initializeBlogs,
    createBlog,
    likeBlog,
    deleteBlog,
} from '../reducers/blogReducer'

const Blogs = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const blogFormRef = useRef()

    const handleLike = (blog) => {
        dispatch(likeBlog(blog))
    }

    const handleRemove = (blog) => {
        dispatch(deleteBlog(blog))
    }

    const handleCreate = (blogData) => {
        dispatch(
            createBlog(blogData, () => blogFormRef.current.toggleVisibility())
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    like={handleLike}
                    remove={handleRemove}
                />
            ))}
            <Toggable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm addNewBlog={handleCreate} />
            </Toggable>
        </div>
    )
}

export default Blogs
