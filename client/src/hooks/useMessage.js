import Message from '../components/UI/Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage, setPermanentMessage } from '../redux/actions/appActions'

export const useMessage = () => {

    const dispatch = useDispatch()
    const { message, permanentMessage } = useSelector(state => state.app)

    const showMessage = () => {
        setTimeout(() => {
            dispatch(setMessage(null))
        }, 3000)
        return <Message message={ message.message } type={ message.type } pageClass={ message.pageClass } />
    }

    const showPermanentMessage = () => {
        return <Message message={ permanentMessage.message } type={ permanentMessage.type } pageClass={ permanentMessage.pageClass } />
    }

    const setMessageState = (message, type, pageClass) => {
        dispatch(setMessage({ message, type, pageClass }))
    }

    const setPermanentMessageState = (message, type, pageClass) => {
        dispatch(setPermanentMessage({ message, type, pageClass }))
    }

    return {
        message,
        setMessageState,
        showMessage,
        permanentMessage,
        setPermanentMessageState,
        showPermanentMessage
    }
}