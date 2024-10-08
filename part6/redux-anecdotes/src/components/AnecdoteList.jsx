import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAndUpdateAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [])

    const anecdotes = useSelector(state => {
        if ( state.filter === 'ALL' ) {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })

    const vote = (anecdote) => {
        console.log('vote', anecdote)
        dispatch(voteAndUpdateAnecdote(anecdote))
        dispatch(setNotificationWithTimeout(`you voted '${anecdote.content}'`))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
            has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList