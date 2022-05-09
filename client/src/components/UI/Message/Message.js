import React from 'react'
import './Message.css'

const Message = ({message, type, pageClass = ''}) => {

    const classList = [
        'text'
    ]
    if (type) classList.push(type)

    return (
        <div className={ 'message ' + pageClass } >
            <p className={ classList.join(' ') }>{message}</p>
        </div>
    )
}

export default Message