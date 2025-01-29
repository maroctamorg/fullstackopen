import { useNavigate } from 'react-router-dom'
import { useSetNotification } from '../context/NotificationContext'
import { useField } from '../hooks'

const AnecdoteForm = (props) => {
  const navigate = useNavigate()
  const setNotification = useSetNotification()

  const contentField = useField('content')
  const authorField = useField('author')
  const infoField = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0
    })
    navigate('/')
    setNotification(`a new anecdote ${contentField.value} created!`)
  }

  const clearForm = () => {
    contentField.reset()
    authorField.reset()
    infoField.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField.input} />
        </div>
        <div>
          author
          <input {...authorField.input} />
        </div>
        <div>
          url for more info
          <input {...infoField.input} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={clearForm}>reset</button>
      </form>
    </div>
  )
}

export default AnecdoteForm