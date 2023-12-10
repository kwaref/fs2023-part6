import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

export const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const add = async evt => {
        evt.preventDefault()
        const content = evt.target.anecdote.value
        evt.target.anecdote.value = ''
        const anecdote = await anecdoteService.create(content)
        dispatch(createAnecdote(anecdote))
        dispatch(setNotification(`you created ${content}`))
        setTimeout(() => dispatch(removeNotification()), 5000)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </>
    )
}
