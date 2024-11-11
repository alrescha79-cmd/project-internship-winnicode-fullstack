import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData } from '../../../api'
import '../../../css/news/detail.css'
import { CImage, CSpinner } from '@coreui/react'

const Detail = () => {
    const [data, setData] = useState(null)
    const user = useFirebaseAuthToken()
    const { slug } = useParams()

    const formatDate = (timestamp) => {
        if (timestamp && typeof timestamp._seconds === 'number' && typeof timestamp._nanoseconds === 'number') {
            const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
            const dateOptions = { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric', 
                timeZone: 'Asia/Jakarta' 
            };
            const timeOptions = { 
                hour: '2-digit', 
                minute: '2-digit', 
                timeZone: 'Asia/Jakarta',
                hourCycle: 'h23',
                hour12: false
            };
            const formattedDate = date.toLocaleDateString('id-ID', dateOptions);
            const formattedTime = date.toLocaleTimeString('id-ID', timeOptions).replace('.', ':');
            return `${formattedDate} ${formattedTime} WIB`;
        }
        return 'Invalid Date';
    };

    useEffect(() => {
        const getData = async () => {
            if (user && slug) {
                try {
                    const response = await fetchData(`${import.meta.env.VITE_API}/news/${slug}`, user)
                    setData(response.data)
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }
        }

        getData()
    }, [user, slug])

    return (
        <div className="detail-container">
            <button className="mb-4 btn btn-secondary" onClick={() => window.history.back()}>Kembali</button>
            {data ? (
                <div className="news-detail">
                    <h1 className="news-title">{data.title}</h1>
                    <div className="news-meta">
                        <small className="news-date">{formatDate(data.createdAt)}</small>
                        <small className="news-author">Ditulis Oleh <strong>{data.author}</strong></small>
                    </div>
                    <CImage fluid className="news-thumbnail" src={data.thumbnailURL} alt={data.title} />
                    <hr />
                    <br />
                    <div className="news-content" dangerouslySetInnerHTML={{ __html: data.content }}></div>
                </div>
            ) : (
                <div className="text-center">
                    <CSpinner />
                </div>
            )}
        </div>
    )
}

export default Detail