import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

const CreatePage = () => {

    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [link, setLink] = useState('')
    const navigate = useNavigate()

    const keyDownHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request(
                    '/api/link/generate',
                    'POST',
                    { from: link },
                    { Authorization: `Bearer ${auth.token}` }
                )
                navigate(`/detail/${data.link._id}`)
            } catch(e) {}
        }
    }

    return (
        <div>
            <h1>Create Page</h1>
            <div>
                <div>
                    <input
                        value={link}
                        placeholder='Вставьте ссылку'
                        onChange={ (e) => setLink(e.target.value) }
                        onKeyDown={ keyDownHandler }
                    />
                </div>
            </div>
        </div>
    )
}

export default CreatePage