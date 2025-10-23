import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './Blog'
import Toggable from './Toggable'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import {
    NOTIFICATION_TYPE,
    setNotificationWithTimeout,
} from '../reducers/notificationReducer'

const Blogs = () => {
    const dispatch = useDispatch()

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const newBlogs = blogs
        setBlogs(newBlogs.sort((a, b) => b.likes - a.likes - 1))
    }, [blogs])

    const blogFormRef = useRef()

    const likeBlog = async (blog) => {
        try {
            setBlogs(
                blogs.map((b) =>
                    b.id === blog.id ? { ...b, likes: b.likes + 1 } : b
                )
            )
            await blogService.update(blog.id, blog)
        } catch (exception) {
            dispatch(
                setNotificationWithTimeout(
                    `unable to like blog: ${exception.message}`,
                    NOTIFICATION_TYPE.ERROR
                )
            )
        }
    }

    const removeBlog = async (blog) => {
        try {
            if (
                !window.confirm(`remove blog ${blog.title} by ${blog.author}`)
            ) {
                return
            }
            await blogService.remove(blog.id)
            setBlogs(blogs.filter((b) => b.id !== blog.id))
        } catch (exception) {
            dispatch(
                setNotificationWithTimeout(
                    `unable to remove blog: ${exception.message}`,
                    NOTIFICATION_TYPE.ERROR
                )
            )
        }
    }

    const addNewBlog = async ({ title, author, url }) => {
        try {
            const newBlog = await blogService.create({
                title,
                author,
                url,
            })
            setBlogs(blogs.concat(newBlog))
            blogFormRef.current.toggleVisibility()
            dispatch(
                setNotificationWithTimeout(
                    `a new blog ${newBlog.title} by ${newBlog.author} added`,
                    NOTIFICATION_TYPE.SUCCESS
                )
            )
        } catch (exception) {
            dispatch(
                setNotificationWithTimeout(
                    `unable to add blog: ${exception.message}`,
                    NOTIFICATION_TYPE.ERROR
                )
            )
        }
    }

    return (
        <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    like={likeBlog}
                    remove={removeBlog}
                />
            ))}
            <Toggable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm addNewBlog={addNewBlog} />
            </Toggable>
        </div>
    )
}

export default Blogs
