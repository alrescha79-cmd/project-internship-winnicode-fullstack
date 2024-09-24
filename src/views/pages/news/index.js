import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData } from '../../../api'
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'

const News = () => {
  const [data, setData] = useState(null)
  const token = useFirebaseAuthToken()
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      if (token) {
        try {
          const response = await fetchData('http://localhost:3000/news', token)
          setData(response.data)
          // console.log(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    getData()
  }, [token])

  const handleEdit = (id) => {
    navigate(`/news/edit/${id}`)
    // alert(`Edit news with id: ${id}`)
  }

  const handleDelete = (id) => {
    alert(`Delete news with id: ${id}`)
  }

  return (
    <div>
      {getAllNews(data, handleEdit, handleDelete)}
    </div>
  )
}

export default News

function getAllNews(news, handleEdit, handleDelete) {
  return (
    <CTable className='mt-4' striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">No.</CTableHeaderCell>
          <CTableHeaderCell scope="col">Judul Berita</CTableHeaderCell>
          <CTableHeaderCell scope="col">Penulis</CTableHeaderCell>
          <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
          <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {Array.isArray(news) && news.length > 0 ? (
          news.map((newsItem, index) => (
            <CTableRow key={newsItem.id}>
              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
              <CTableDataCell>{newsItem.title}</CTableDataCell>
              <CTableDataCell>{newsItem.author}</CTableDataCell>
              <CTableDataCell>{formatDate(newsItem.createdAt)}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" className='me-2' onClick={() => handleEdit(newsItem.id)}>Edit</CButton>
                <CButton color="danger" onClick={() => handleDelete(newsItem.id)}>Hapus</CButton>
              </CTableDataCell>
            </CTableRow>
          ))
        ) : (
          <CTableRow>
            <CTableDataCell colSpan="5" className="text-center">Loading...</CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  )
}

function formatDate(timestamp) {
  if (timestamp && typeof timestamp._seconds === 'number' && typeof timestamp._nanoseconds === 'number') {
    const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000)
    return date.toLocaleDateString()
  }
  return 'Invalid Date'
}