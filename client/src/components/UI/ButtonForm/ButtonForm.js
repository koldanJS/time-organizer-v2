import React from 'react'
import './ButtonForm.css'

function ButtonForm({ classType, clickHandler, disabled, type, ...props }) {

    const classList = [
        'Button',
        classType
    ]

    return (
        <button
            type={ type }
            onClick={ clickHandler }
            className={ classList.join(' ') }
            disabled={ disabled }
        >
            { props.children }
        </button>
    )
}

export default ButtonForm