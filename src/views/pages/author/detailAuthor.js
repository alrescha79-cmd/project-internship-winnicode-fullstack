import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData } from '../../../api'
import { CButton, CImage, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'

const DetailAuthorPage = () => {
    const [authorData, setAuthorData] = useState(null)
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const user = useFirebaseAuthToken()
    const { id } = useParams()

    useEffect(() => {
        const fetchAuthorAndNews = async () => {
            if (user && id) {
                try {
                    const authorResponse = await fetchData(`${import.meta.env.VITE_API}/journalist/${id}`, user.token)
                    setAuthorData(authorResponse)

                    const newsResponse = await fetchData(`${import.meta.env.VITE_API}/news/author/${id}`, user)
                    setNews(newsResponse.data || [])
                    console.log(newsResponse)
                } catch (error) {
                    console.error('Error fetching data:', error)
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchAuthorAndNews()
    }, [user, id])


    function formatFirestoreDate(timestamp) {
        if (timestamp && typeof timestamp._seconds === 'number' && typeof timestamp._nanoseconds === 'number') {
            const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000)
            return date.toLocaleDateString()
        }
        return 'Invalid Date'
    }

    return (
        <>
            <CButton color="primary" onClick={() => window.history.back()}>Kembali</CButton>
            <h1 className='text-center mb-4 mt-2'>Detail Penulis</h1>
            <div className="col-6 mb-4 px-4">
                <div className='d-flex align-items-center justify-content-around'>
                    <CImage
                        src={authorData?.profilePicture || ''}
                        alt={authorData?.name || 'Loading...'}
                        width={200}
                        height={200}
                        className="rounded-circle me-4"
                    />
                    <div className='d-flex flex-column'>
                        <h3>Nama: {authorData?.name || <CSpinner color="primary" />}</h3>
                        <p>Email: {authorData?.email || <CSpinner color="primary" />}</p>
                        <p>Phone: {authorData?.phone || <CSpinner color="primary" />}</p>
                        <p>Jumlah Postingan: {news.length}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 px-4">
                <h3>Postingan</h3>
                <CTable className='mt-4' striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">No.</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Gambar</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Judul Berita</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Kategori</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Tanggal Posting</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {loading ? (
                            <CTableRow>
                                <CTableDataCell colSpan="4" className="text-center">
                                    <CSpinner color="primary" />
                                </CTableDataCell>
                            </CTableRow>
                        ) : news.length > 0 ? (
                            news.map((article, index) => (
                                <CTableRow key={article.id}>
                                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                    <CImage
                                        src={article.thumbnailURL || ''}
                                        alt={article.title}
                                        width={75}
                                        height={75}
                                        className="img-fluid img-thumbnail"
                                    />
                                    <CTableDataCell>{article.title}</CTableDataCell>
                                    <CTableDataCell>{article.category}</CTableDataCell>
                                    <CTableDataCell>{formatFirestoreDate(article.createdAt)}</CTableDataCell>
                                </CTableRow>
                            ))
                        ) : (
                            <CTableRow>
                                <CTableDataCell colSpan="5" className="text-center">
                                    Tidak ada berita yang ditemukan.
                                </CTableDataCell>
                            </CTableRow>
                        )}
                    </CTableBody>
                </CTable>
            </div>
        </>
    )
}

export default DetailAuthorPage
