import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToVoteUp = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = { ...anecdoteToVoteUp, votes: anecdoteToVoteUp.votes + 1 }
      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote).sort((a, b) => b.votes - a.votes)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, setAnecdotes, vote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.sort((a, b) => b.votes - a.votes)))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)
    dispatch(addAnecdote(anecdote))
  }
}

export const voteUp = (id, anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, anecdote)
    dispatch(vote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer