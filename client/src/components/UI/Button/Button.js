import React from 'react'
import './Button.css'

const Button = ({ classType, clickHandler, disabled, ...props }) => {

    const classList = [
        'btn',
        classType
    ]

    return (
        <button
            onClick={ clickHandler }
            className={ classList.join(' ') }
            disabled={ disabled }
        >
            { props.children }
        </button>
    )
}

export default Button