import { useSelector, useDispatch } from 'react-redux'
import { voteUp } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

export const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
      if (filter === '') {
          return anecdotes
      }
      return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  const vote = (id, anecdoteToVote) => {
      console.log('vote', id)
      dispatch(voteUp(id, {...anecdoteToVote, votes: anecdoteToVote.votes + 1 }))
      dispatch(notify(`you voted ${anecdoteToVote.content}`, 5000))
  }

  return (
  <>
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
  </>
  )
}
