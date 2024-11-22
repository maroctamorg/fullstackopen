import axios from 'axios'

export const getAnecdotes = () =>
    axios.get('http://localhost:3001/anecdotes').then(response => response.data)

export const createAnecdote = (anecdote) =>
    axios.post('http://localhost:3001/anecdotes', anecdote).then(response => response.data)

export const voteAnecdote = (anecdote) =>
    axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote).then(response => response.data)