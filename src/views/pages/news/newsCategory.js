import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData, patchData } from '../../../api'
import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CToaster, CToast, CToastBody, CToastHeader, CSpinner } from '@coreui/react'

const NewsCategory = () => {
  const [data, setData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [newCategory, setNewCategory] = useState('')
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const toaster = useRef()
  const user = useFirebaseAuthToken()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories()
  }, [user])

  const fetchCategories = async () => {
    if (user) {
      try {
        const response = await fetchData(`${import.meta.env.VITE_API}/news`, user)
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        addToast(createToast('Error', 'Gagal memuat data kategori.', 'danger'))
      }
    }
  }

  const groupedData = data.reduce((acc, news) => {
    const category = news.category
    if (!acc[category]) {
      acc[category] = { category, newsCount: 0 }
    }
    acc[category].newsCount += 1
    return acc
  }, {})

  const uniqueData = Object.values(groupedData)

  const handleViewNews = (category) => {
    navigate(`/news/category/${category}`)
  }

  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setNewCategory(category)
    setVisible(true)
  }

  const handleSaveCategory = async () => {
    if (!newCategory.trim()) {
      addToast(createToast('Error', 'Nama kategori baru tidak boleh kosong.', 'danger'))
      return
    }

    setIsSaving(true)

    try {
      const body = {
        oldCategory: selectedCategory,
        newCategory: newCategory.trim(),
      }

      await patchData(`${import.meta.env.VITE_API}/news/category`, body, user.token)
      addToast(createToast('Success', 'Kategori berhasil diubah.', 'success'))

      setVisible(false)

      await fetchCategories()
    } catch (error) {
      console.error('Error updating category:', error)
      addToast(createToast('Error', 'Gagal mengubah kategori.', 'danger'))
    } finally {
      setIsSaving(false)
    }
  }

  const createToast = (title, message, type) => (
    <CToast color={type} autohide={true} delay={3000}>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill={type === 'success' ? '#28a745' : '#dc3545'}></rect>
        </svg>
        <strong className="me-auto">{title}</strong>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  )

  return (
    <>
      <h1 className='text-center mt-2 mb-4'>Kategori Berita</h1>
      <CRow className='mb-4'>
        {uniqueData.map((category, index) => (
          <CCol sm={6} key={index}>
            <CCard className='mb-4'>
              <CCardHeader as="h4" className='text-center'>
                {category.category}
                <CDropdown dark className='float-end'>
                  <CDropdownToggle color="secondary"></CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => handleEditCategory(category.category)}>Ubah Nama Kategori</CDropdownItem>
                    <CDropdownItem href="#">Tambah Berita</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCardHeader>
              <CCardBody>
                <CCardTitle>{category.newsCount} Berita</CCardTitle>
                <CCardText>Berita tentang <b>{category.category}</b></CCardText>
                <CButton color="primary" onClick={() => handleViewNews(category.category)}>
                  Lihat Berita
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      {/* Modal for Edit Category */}
      <CModal
        alignment="center"
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Ubah Nama Kategori</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Masukkan nama kategori baru"
            aria-label="Nama kategori baru"
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)} disabled={isSaving}>
            Tutup
          </CButton>
          <CButton color="primary" onClick={handleSaveCategory} disabled={isSaving}>
            {isSaving ? (
              <>
                Menyimpan
                {' '}
                <CSpinner as="span" size="sm" aria-hidden="true" />
              </>
            ) : (
              'Simpan Perubahan'
            )}
          </CButton>
        </CModalFooter>
      </CModal>

      <CToaster ref={toaster} push={toast} placement="top-center" />
    </>
  )
}

export default NewsCategory
