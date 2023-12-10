import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return null
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const notify = (message, timeOut) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => dispatch(removeNotification()), timeOut)
    }
  }

export default notificationSlice.reducer