import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import {
    setNotificationWithTimeout,
    NOTIFICATION_TYPE,
} from './notificationReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        updateBlog(state, action) {
            const updated = action.payload
            return state.map((b) => (b.id === updated.id ? updated : b))
        },
        removeBlog(state, action) {
            const id = action.payload
            return state.filter((b) => b.id !== id)
        },
    },
})

export const initializeBlogs = () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll()
            dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
        } catch (e) {
            dispatch(
                setNotificationWithTimeout(
                    `unable to fetch blogs: ${e.message}`,
                    NOTIFICATION_TYPE.ERROR
                )
            )
        }
    }
}

export const createBlog = (blogData) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(blogData)
            dispatch(appendBlog(newBlog))
            dispatch(
                setNotificationWithTimeout(
                    `a new blog ${newBlog.title} by ${newBlog.author} added`,
                    NOTIFICATION_TYPE.SUCCESS
                )
            )
        } catch (e) {
            dispatch(
                setNotificationWithTimeout(
                    `unable to add blog: ${e.message}`,
                    NOTIFICATION_TYPE.ERROR
                )
            )
        }
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        try {
            const updated = { ...blog, likes: blog.likes + 1 }
            const returned = await blogService.update(blog.id, updated)
            dispatch(updateBlog(returned))
        } catch (e) {
            dispatch(
                setNotificationWithTimeout(
                    `unable to like blog: ${e.message}`,
                    NOTIFICATION_TYPE.ERROR
                )
            )
        }
    }
}

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        try {
            await blogService.remove(blog.id)
            dispatch(removeBlog(blog.id))
        } catch (e) {
            dispatch(
                setNotificationWithTimeout(
                    `unable to remove blog: ${e.message}`,
                    NOTIFICATION_TYPE.ERROR
                )
            )
        }
    }
}

export const addBlogComment = (blog, comment) => {
    return async (dispatch) => {
        try {
            await blogService.addComment(blog.id, comment)
            const updated = { ...blog, comments: blog.comments.concat(comment) }
            dispatch(updateBlog(updated))
        } catch (e) {
            dispatch(
                setNotificationWithTimeout(
                    `unable to add comment: ${e.message}`,
                    NOTIFICATION_TYPE.ERROR
                )
            )
        }
    }
}

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
    blogSlice.actions
export default blogSlice.reducer
