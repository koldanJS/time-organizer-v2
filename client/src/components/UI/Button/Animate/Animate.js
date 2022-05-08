import React from 'react'
import images from '../../../img/img'
import './Animate.css'

const Animate = ({title}) => {

    const getContent = () => {
        return (
            <>
                <img src={images.strike} alt='Timer' className='strike hour' />
                <img src={images.strike} className='strike minute' />
                <img src={images.clock} />
            </>
        )
    }

    return (
        <>
            <div className='animate' >
                { getContent() }
                
            </div>
            <p className='text color-white' >{ title }</p>
        </>
    )
}

export default Animate