import React from 'react'

const EditUserItem = ({label, items, setIsChange }) => {



    return (
        <div className='edit-user-item'>
            <hr className='demiliter' />
            <h3 className='text size-22 width-700' >{ label }</h3>
            <ul>
                {
                    items.map((item, index) => {
                        return (
                            <li key={ index } >
                                <p className='text' >{ item.name }</p>
                                <input
                                    className='text size-16'
                                    value={ item.value }
                                    placeholder={ item.placeholder }
                                    onChange={ (e) => {
                                        setIsChange(true)
                                        item.setValue(e.target.value)
                                    } }
                                    type={ item.type ? item.type : 'text' }
                                />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default EditUserItem