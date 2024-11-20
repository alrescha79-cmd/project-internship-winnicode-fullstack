import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData, deleteData } from '../../../api'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import DataTableComponent from '../../../components/DataTable'

const News = () => {
  const [data, setData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState('')
  const user = useFirebaseAuthToken()
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      if (user) {
        try {
          const response = await fetchData(`${import.meta.env.VITE_API}/news`, user)
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
        await deleteData(`${import.meta.env.VITE_API}/news/${selectedId}`, user.token)
        const updatedData = data.filter(news => news.id !== selectedId)
        setData(updatedData)
        setModalVisible(false)
      } catch (error) {
        console.error('Error deleting news:', error)
      }
    }
  }

  function formatDate(timestamp) {
    if (timestamp && typeof timestamp._seconds === 'number' && typeof timestamp._nanoseconds === 'number') {
      const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000)
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    }
    return 'Invalid Date'
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

  const columns = [
    {
      name: 'No.',
      selector: (row, index) => index + 1,
      sortable: false,
      width: '60px',
    },
    {
      name: 'Judul Berita',
      selector: (row) => row.title,
      sortable: true,
      width: '400px',
    },
    {
      name: 'Kategori',
      selector: (row) => row.category || 'Uncategorized',
      sortable: true,
      width: '150px',
    },
    {
      name: 'Penulis',
      selector: (row) => row.author,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Tanggal',
      selector: (row) => formatDate(row.createdAt),
      sortable: true,
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div>
          <CButton color="info" className="me-2 mt-1" onClick={() => handleView(row.slug)}>
            Lihat
          </CButton>
          <CButton color="primary" className="me-2 mt-1" onClick={() => handleEdit(row.slug)}>
            Edit
          </CButton>
          <CButton color="danger" className='mt-2 mb-1' onClick={() => openModal(row.id, row.title)}>
            Hapus
          </CButton>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ]

  const searchOptions = {
    field: 'title',
    placeholder: 'Cari berdasarkan judul...',
  }

  const filterOptions = {
    field: 'category',
    allLabel: 'Semua Kategori',
    options: [...new Set(data.map((item) => ({ value: item.category, label: item.category })))],
  }

  return (
    <div>
      <DataTableComponent
        columns={columns}
        data={data}
        searchOptions={searchOptions}
        filterOptions={filterOptions}
      />
      <CModal alignment="center" visible={modalVisible} onClose={closeModal}>
        <CModalHeader>
          <CModalTitle>Apakah Anda yakin ingin menghapus berita ini?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h4>{selectedTitle}</h4>
          <br />
          <small className="text-danger fw-bold">Setelah dihapus, berita tidak dapat dikembalikan.</small>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Batal
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Hapus
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default News
