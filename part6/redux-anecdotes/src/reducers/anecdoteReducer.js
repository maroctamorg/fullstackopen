import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        voteAnecdote(state, action) {
            const id = action.payload
            const anecdoteToChange = state.find(a => a.id === id)
            anecdoteToChange.votes++
            state.sort((a, b) => b.votes - a.votes)
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const anecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(anecdote))
    }
}

export const voteAndUpdateAnecdote = anecdote => {
    return async dispatch => {
        await anecdoteService.vote(anecdote)
        dispatch(voteAnecdote(anecdote.id))
    }
}

export default anecdoteSlice.reducer