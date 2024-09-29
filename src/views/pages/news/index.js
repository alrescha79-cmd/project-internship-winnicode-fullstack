import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData, deleteData } from '../../../api'
import { CButton, CImage, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'

const News = () => {
  const [data, setData] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState('')
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

  const handleDelete = async () => {
    if (user && user.token && selectedId) {
      try {
        await deleteData(`http://localhost:3000/news/${selectedId}`, user.token)
        const updatedData = data.filter(news => news.id !== selectedId)
        setData(updatedData)
        setModalVisible(false)
      } catch (error) {
        console.error('Error deleting news:', error)
      }
    }
  }

  const openModal = (id, title) => {
    setSelectedId(id)
    setSelectedTitle(title)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedId(null)
    setSelectedTitle('')
  }

  return (
    <div>
      {getAllNews(data, handleEdit, openModal, handleView)}
      <CModal alignment="center" visible={modalVisible} onClose={closeModal}>
        <CModalHeader>
          <CModalTitle>Apakah Anda yakin ingin menghapus berita ini?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h4>{selectedTitle}</h4>
          <br />
          <small className='text-danger fw-bold'>Setelah dihapus, berita tidak dapat dikembalikan.</small>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>Batal</CButton>
          <CButton color="danger" onClick={handleDelete}>Hapus</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default News

function getAllNews(news, handleEdit, openModal, handleView) {
  return (
    <>
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
                  <CButton color="danger" onClick={() => openModal(newsItem.id, newsItem.title)}>Hapus</CButton>
                </CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="7" className="text-center">
                  <div className="text-center">
                    <CSpinner />
                  </div>
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
    </>
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