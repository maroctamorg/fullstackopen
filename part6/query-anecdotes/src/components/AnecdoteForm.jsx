import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useSetNotification } from '../context/NotificationContext'

const AnecdoteForm = () => {
    const setNotification = useSetNotification()

    const queryClient = useQueryClient()

    const addMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: 'anecdotes' })
            setNotification(`Anecdote '${data.content}' created`)
        },
        onError: (error) => {
            setNotification(error.response.data.error)
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        addMutation.mutate({ content, votes: 0 })
        console.log('new anecdote')
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
