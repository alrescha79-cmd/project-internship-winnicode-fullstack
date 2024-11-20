import React, { useEffect, useState } from 'react'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData, postData, PostPhoneData } from '../../../api'
import { CRow, CCol, CCard, CCardBody, CCardTitle } from '@coreui/react'
import AddNewAuthor from '../../../components/AddNewAuthor'
import AccountAuthor from '../../../components/AccountAuthor'
import ListAuthors from '../../../components/ListAuthors'

const Author = () => {
  const [data, setData] = useState(null)
  const [authors, setAuthors] = useState([])
  const [newAuthor, setNewAuthor] = useState({ name: '', email: '', phone: '' })
  const [error, setError] = useState('')
  const user = useFirebaseAuthToken()

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      if (user?.token) {
        try {
          const [authorData, allAuthors] = await Promise.all([
            fetchData(`${import.meta.env.VITE_API}/journalist/${user.uid}`, user.token),
            fetchData(`${import.meta.env.VITE_API}/journalist`, user.token),
          ])
          setData(authorData)
          setAuthors(allAuthors)
        } catch (error) {
          console.error('Error fetching data:', error)
          setError('Gagal memuat data penulis')
        }
      }
    }

    fetchDataFromAPI()
  }, [user])

  const handleAddAuthor = async () => {
    if (!newAuthor.phone.startsWith('+')) {
        setError('Nomor telepon harus dimulai dengan tanda + dan kode negara.')
        return
    }

    const phoneRegex = /^\+[1-9]\d{1,14}$/
    if (!phoneRegex.test(newAuthor.phone)) {
        setError('Nomor telepon tidak valid. Gunakan format +628123456789.')
        return
    }

    // Lanjutkan dengan pengiriman data ke API...
    console.log('Data yang akan dikirim:', newAuthor)
    try {
      const response = await PostPhoneData(`${import.meta.env.VITE_API}/journalist/add`, newAuthor, user.token)
      console.log('Respons dari server:', response)
      setNewAuthor({ name: '', email: '', phone: '' })
      setError('')
      alert('Penulis berhasil ditambahkan!')
    } catch (err) {
      console.error('Error adding author:', err)
      setError(err.response?.data?.message || 'Terjadi kesalahan saat menambahkan penulis.')
    }
}



  return (
    <>
      <CRow className="mb-4">
        <AccountAuthor data={data} />
        <CCol sm={9}>
          <CCard>
            <CCardBody>
              <CCardTitle className="text-center">Tambah Penulis Baru</CCardTitle>
              <hr />
              <AddNewAuthor
                newAuthor={newAuthor}
                setNewAuthor={setNewAuthor}
                handleAddAuthor={handleAddAuthor}
                error={error}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <hr />
      <h4>Daftar Penulis</h4>
      <ListAuthors authors={authors} />
    </>
  )
}

export default Author
