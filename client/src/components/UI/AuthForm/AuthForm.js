import React, { useState } from 'react'
import ButtonForm from '../ButtonForm/ButtonForm'
import './AuthForm.css'

const AuthForm = ({ label, buttonText, placeholders, submitHandler, linkText, changeForm, loading /*, forgotPasswordText, forgotPassword*/ }) => {

    const [form, setForm] = useState({ email: '', password: '' })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <form className='auth-form' onSubmit={ (e) => submitHandler(e, form) } >
            <h3 className='text' > { label } </h3>
            <hr className='demiliter' />
            <input
                className='text'
                name='email'
                value={ form.email }
                placeholder={ placeholders.email }
                onChange={ changeHandler }
            />
            <input
                className='text'
                name='password'
                value={ form.password }
                placeholder={ placeholders.password }
                type='password'
                onChange={ changeHandler }
            />
            <ButtonForm type='submit' classType='success sign' disabled={ loading } >
                <p className='text color-white' > { buttonText } </p>
            </ButtonForm>
            <div className='links' >
                <button type='button' className='text size-16' onClick={ changeForm } >{linkText}</button>
                {/* {
                    forgotPasswordText
                        ? <button className='text size-16' onClick={ forgotPassword } >{forgotPasswordText}</button>
                        : null
                } */}
            </div>
        </form>
    )
}

export default AuthForm