import Message from '../components/UI/Message/Message'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../redux/actions/appActions'

export const useMessage = () => {

    // const [message, setMessage] = useState(null)
    const dispatch = useDispatch()
    const { message } = useSelector(state => state.app)

    const showMessage = () => {
        setTimeout(() => {
            // setMessage(null)
            dispatch(setMessage(null))
        }, 3000)
        return <Message message={ message.message } type={ message.type } pageClass={ message.pageClass } />
    }

    const setMessageState = (message, type, pageClass) => {
        dispatch(setMessage({ message, type, pageClass }))
    }

    return {
        message,
        setMessageState,
        showMessage
    }
}