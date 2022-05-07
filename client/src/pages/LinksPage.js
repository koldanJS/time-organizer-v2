import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import LinksList from '../components/LinksList/LinksList'

const LinksPage = () => {

    const { request, loading } = useHttp()
    const [links, setLinks] = useState(null)
    const { token } = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request(
                '/api/link',
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            setLinks(fetched)
        } catch(e) {}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (!links || loading) {
        return
    }

    return (
        <div>
            <h1>Links Page</h1>
            <LinksList links={ links } />
        </div>
    )
}

export default LinksPage