import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData } from '../../../api'
import { CButton, CImage, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'

const detailAuthorPage = () => {
    const [data, setData] = useState(null)
    const user = useFirebaseAuthToken()
    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            if (user && id) {
                try {
                    const response = await fetchData(`${import.meta.env.VITE_API}/journalist/${id}`, user.token)
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
        <>
            <CButton color="primary" onClick={() => window.history.back()}>Kembali</CButton>
            <h1 className='text-center mb-4 mt-2'>Detail Author</h1>
            <div className="col-6 mb-4 px-4">
                <div className='d-flex align-items-center justify-content-around '>
                    <CImage src={data ? data.profilePicture : <CSpinner color="primary" />} alt={data ? data.name : 'Loading...'} width={200}
                        height={200}
                        className="rounded-circle me-4" />
                    <div className='d-flex flex-column'>
                        <h3>Nama: {data ? data.name : <CSpinner color="primary" />}</h3>
                        <p>Email: {data ? data.email : <CSpinner color="primary" />}</p>
                        <p>Phone: {data ? data.phone : <CSpinner color="primary" />}</p>
                        <p>Jumlah Postingan: </p>
                    </div>
                </div>
            </div>
            <div className="mt-4 px-4">
                <h3>Postingan</h3>
            <CTable className='mt-4' striped>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">No.</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Judul Berita</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Kategori</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Tanggal Posting</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow>
                        <CTableHeaderCell scope="row">1</CTableHeaderCell>
                        <CTableDataCell>Ini Judulnya</CTableDataCell>
                        <CTableDataCell>Kategorinya</CTableDataCell>
                        <CTableDataCell>19/11/2024</CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
            </div>
        </>
    )
}

export default detailAuthorPage