import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {

  const notificationDispatch = useNotificationDispatch()

  const client =  useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      console.log(error)
      notificationDispatch({type: 'SET', payload: error.response.data.error})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: 'SET', payload: `you created ${content}` })
    setTimeout(() => notificationDispatch({type: 'REMOVE'}), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
