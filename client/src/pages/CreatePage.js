import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

const CreatePage = () => {

    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [form, setForm] = useState({ projectName: '', description: '' })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const saveHandler = async () => {
        try {
            const data = await request(
                '/api/project/create',
                'POST',
                { ...form },
                { Authorization: `Bearer ${auth.token}` }
            )
            message(data.message)
        } catch(e) {}
    }

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const clearHandler = event => {
        setForm({ projectName: '', description: '' })
    }

    return (
        <div>
            <h1>Create Page</h1>
            <div>
                <form>
                    <input
                        name='projectName'
                        value={form.projectName}
                        placeholder='Имя проекта...'
                        onChange={changeHandler}
                    />
                    <input
                        name='description'
                        value={form.description}
                        placeholder='Описание проекта...'
                        onChange={changeHandler}
                    />
                    <button
                        onClick={saveHandler}
                        disabled={loading}
                    >
                        Создать проект
                    </button>
                    <button
                        onClick={clearHandler}
                        disabled={loading}
                    >
                        Очистить поля
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePage