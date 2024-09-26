import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData } from '../../../api'

const Detail = () => {
    const [data, setData] = useState(null)
    const user = useFirebaseAuthToken()
    const { slug } = useParams() // Mengambil slug dari URL

    useEffect(() => {
        const getData = async () => {
            if (user && slug) {
                try {
                    const response = await fetchData(`http://localhost:3000/news/${slug}`, user)
                    setData(response.data)
                    console.log(response.data)
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }
        }

        getData()
    }, [user, slug]) // Tambahkan slug sebagai dependency

    return (
        <div>
            {data ? (
                <div>
                    <h1>{data.title}</h1>
                    <small>{data.author}</small>
                    <small>{data.date}</small>
                    <img src={data.thumbnailURL} alt={data.title} width={'200px'}/>

                    <p>{data.content}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Detail
