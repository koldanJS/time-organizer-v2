import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/Loader/Loader'
import LinkCard from '../components/LinkCard/LinkCard'


const DetailPage = () => {

    const { token } = useContext(AuthContext)
    const { loading, request } = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id
    // Мемоизируем ф-ю, чтоб изменять ее только при изменении массива зависимостей
    const getLink = useCallback(async () => {
        console.log('getLink')
        try {
            const fetched = await request(
                `/api/link/${linkId}`,
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            setLink(fetched)
        } catch(e) {}
    }, [token, linkId, request])
    // Получать новую ссылку при изменении getLink или перезагрузке
    useEffect(() => {
        getLink()
    }, [getLink])
    // Пока не загрузится ссылка, показывать Лодер
    if (loading || !link) {
        return <Loader />
    }

    return (
        <div>
            <h1>Detail Page</h1>
            <LinkCard link={link} />
        </div>
    )
}

export default DetailPage