import React from 'react'
import './Select.css'

const Select = ({ label, value, name, onChange, options, classType }) => {

    const classList = ['select text size-16']
    if (classType) classList.push(classType)
    const htmlFor = `${label}-${Math.random()}`

    return (
        <div className={ classList.join(' ') } >
            <label htmlFor={ htmlFor }>{ label }</label>
            <select
                id={ htmlFor }
                name={ name }
                value={ value }
                onChange={ onChange }
            >
                {options.map(option => {
                    return (
                        <option
                            key={ option.id }
                            value={ option.id }
                        >
                            { option.text }
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select