import React from 'react'
import './LeftRightBtn.css'

const LeftRightBtn = ({classList, clickHandler, ...props}) => {

    

    return (
        <button onClick={() => clickHandler(-1)} className={classList} >
            { props.children }
        </button>
    )
}

export default LeftRightBtn