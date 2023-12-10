import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

export const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const add = evt => {
        evt.preventDefault()
        const content = evt.target.anecdote.value
        evt.target.anecdote.value = ''
        dispatch(addAnecdote(content))
    }

    return (
        <form onSubmit={add}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
    )
}
