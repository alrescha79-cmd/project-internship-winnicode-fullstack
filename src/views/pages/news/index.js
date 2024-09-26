import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData, deleteData } from '../../../api'
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'

const News = () => {
  const [data, setData] = useState(null)
  const user = useFirebaseAuthToken()
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      if (user) {
        try {
          const response = await fetchData('http://localhost:3000/news', user)
          setData(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    getData()
  }, [user])

  const handleEdit = (slug) => {
    navigate(`/news/edit/${slug}`)
  }

  const handleView = (slug) => {
    navigate(`/news/${slug}`)
  }

  const handleDelete = async (id) => {
    if (user && user.token) {
      if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
        try {
          await deleteData(`http://localhost:3000/news/${id}`, user.token)
          const updatedData = data.filter(news => news.id !== id)
          setData(updatedData)
        } catch (error) {
          console.error('Error deleting news:', error)
        }
      }
    }
  }

  return (
    <div>
      {getAllNews(data, handleEdit, handleDelete, handleView)}
    </div>
  )
}

export default News

function getAllNews(news, handleEdit, handleDelete, handleView) {
  return (
    <CTable className='mt-4' striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">No.</CTableHeaderCell>
          <CTableHeaderCell scope="col">Judul Berita</CTableHeaderCell>
          <CTableHeaderCell scope="col">Kategory Berita</CTableHeaderCell>
          <CTableHeaderCell scope="col">Penulis</CTableHeaderCell>
          <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
          <CTableHeaderCell scope="col">Waktu</CTableHeaderCell>
          <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {Array.isArray(news) && news.length > 0 ? (
          news.map((newsItem, index) => (
            <CTableRow key={newsItem.id}>
              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
              <CTableDataCell>{newsItem.title}</CTableDataCell>
              <CTableDataCell>{newsItem.category || 'Uncategorized'}</CTableDataCell>
              <CTableDataCell>{newsItem.author}</CTableDataCell>
              <CTableDataCell>{formatDate(newsItem.createdAt)}</CTableDataCell>
              <CTableDataCell>{formatTime(newsItem.createdAt)}</CTableDataCell>
              <CTableDataCell>
                <CButton color="info" className='me-2' onClick={() => handleView(newsItem.slug)}>Lihat</CButton>
                <CButton color="primary" className='me-2' onClick={() => handleEdit(newsItem.slug)}>Edit</CButton>
                <CButton color="danger" onClick={() => handleDelete(newsItem.id)}>Hapus</CButton>
              </CTableDataCell>
            </CTableRow>
          ))
        ) : (
          <CTableRow>
            <CTableDataCell colSpan="7" className="text-center">Loading...</CTableDataCell>
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

function formatTime(timestamp) {
  if (timestamp && typeof timestamp._seconds === 'number' && typeof timestamp._nanoseconds === 'number') {
    const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000)
    return date.toLocaleTimeString()
  }
  return 'Invalid Time'
}