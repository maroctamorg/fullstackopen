import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getAnecdotes, voteAnecdote } from './requests'
import { useSetNotification } from './context/NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
    const setNotification = useSetNotification()

    const queryClient = useQueryClient()

    const voteMutation = useMutation({
        mutationFn: voteAnecdote,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: 'anecdotes' })
            setNotification(`Anecdote ´${data.content}' voted`)
        }
    })

    const handleVote = (anecdote) => {
        voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }

    const result = useQuery({
        queryKey: 'anecdotes',
        queryFn: getAnecdotes,
        retry: false,
        refetchOnWindowFocus: false
    })

    if(result.isLoading) {
        return <div>Loading...</div>
    }

    if(result.isError) {
        return <div>anecdote service not available due to problems in server</div>
    }

    const anecdotes = result.data

    return (
        <div>
            <h3>Anecdote app</h3>
    
            <Notification />
            <AnecdoteForm />
    
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
            has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
