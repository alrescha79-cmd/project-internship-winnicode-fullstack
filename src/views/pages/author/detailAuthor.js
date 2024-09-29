import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData } from '../../../api'
import { CButton, CImage } from '@coreui/react'

const detailAuthorPage = () => {
    const [data, setData] = useState(null)
    const user = useFirebaseAuthToken()
    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            if (user && id) {
                try {
                    const response = await fetchData(`http://localhost:3000/journalist/${id}`, user.token)
                    setData(response)
                    console.log(response)
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }
        }

        getData()
    }
    , [user, id])



    return (
        <div>
            <CButton color="primary" onClick={() => window.history.back()}>Kembali</CButton>
            <h1>Detail Author</h1>
            <div>
                <h3>{data ? data.name : 'Loading...'}</h3>
                <p>Email: {data ? data.email : 'Loading...'}</p>
                <p>Phone: {data ? data.phone : 'Loading...'}</p>
                <CImage src={data ? data.profilePicture : 'Loading...'} alt={data ? data.name : 'Loading...'} />
            </div>
        </div>
    )
}

export default detailAuthorPage