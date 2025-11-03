import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ addNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        addNewBlog({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2" controlId="blogTitle">
                    <Form.Label>title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        placeholder="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="blogAuthor">
                    <Form.Label>author</Form.Label>
                    <Form.Control
                        type="text"
                        value={author}
                        placeholder="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="blogUrl">
                    <Form.Label>url</Form.Label>
                    <Form.Control
                        type="text"
                        value={url}
                        placeholder="URL"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">create</Button>
            </Form>
        </div>
    )
}

export default BlogForm
