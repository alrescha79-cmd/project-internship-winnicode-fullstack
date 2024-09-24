import React, { useEffect, useState } from 'react'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData } from '../../../api'
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton, CRow, CCol, CForm, CFormInput, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'
import ReactImg from '../../../assets/images/avatars/7.jpg'

const Author = () => {
  const [data, setData] = useState(null)
  const [authors, setAuthors] = useState([])
  const user = useFirebaseAuthToken()

  useEffect(() => {
    const getData = async () => {
      if (user && user.uid && user.token) {
        try {
          const response = await fetchData(`http://localhost:3000/journalist/${user.uid}`, user.token)
          // console.log('API Response:', response)
          setData(response)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    const getAuthors = async () => {
      if (user && user.token) {
        try {
          const response = await fetchData('http://localhost:3000/journalist', user.token)
          // console.log('Authors API Response:', response)
          setAuthors(response)
        } catch (error) {
          console.error('Error fetching authors:', error)
        }
      }
    }

    getData()
    getAuthors()
  }, [user])

  return (
    <>
      <CRow className='mb-4'>
        {journalist(data)}
        <CCol sm={9}>
          <CCard>
            <CCardBody>
              <CCardTitle className='text-center'>Tambah Penulis Baru</CCardTitle>
              <hr />
              {addNewAuthor()}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <hr />
      <h4>Daftar Penulis</h4>
      {listAuthors(authors)}
    </>
  )
}

export default Author

function addNewAuthor() {
  return <CForm className='mt-4'>
    <CFormInput
      type="text"
      id="exampleFormControlInput1"
      label="Nama Penulis"
      placeholder="Masukkan nama penulis"
      aria-describedby="exampleFormControlInputHelpInline"
      className='mb-2' />
    <CFormInput
      type="email"
      id="exampleFormControlInput1"
      label="Email Penulis"
      placeholder="nama@email.com"
      aria-describedby="exampleFormControlInputHelpInline"
      className='mb-2' />
    <CFormInput
      type="number"
      id="exampleFormControlInput1"
      label="Nomor Telepon"
      placeholder="6281234567890"
      aria-describedby="exampleFormControlInputHelpInline"
      className='mb-2' />
    <CFormInput type="file" size="sm" id="formFileSm" label="Foto Penulis" />
    <CButton color="primary" className='mt-4'>Simpan</CButton>
  </CForm>
}

function listAuthors(authors) {
  return <CTable className='mt-4' striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">No.</CTableHeaderCell>
        <CTableHeaderCell scope="col">Nama Penulis</CTableHeaderCell>
        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
        <CTableHeaderCell scope="col">Jumlah Postingan</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      {Array.isArray(authors) && authors.length > 0 ? (
        authors.map((author, index) => (
          <CTableRow key={author.id}>
            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
            <CTableDataCell>{author.name}</CTableDataCell>
            <CTableDataCell>{author.email}</CTableDataCell>
            <CTableDataCell>10</CTableDataCell>
            {/* <CTableDataCell>{author.postsCount || 0}</CTableDataCell> */}
          </CTableRow>
        ))
      ) : (
        <CTableRow>
          <CTableDataCell colSpan="4" className="text-center">Loading...</CTableDataCell>
        </CTableRow>
      )}
    </CTableBody>
  </CTable>
}

function journalist(data) {
  return <CCol sm={3}>
    <CCard style={{ width: '18rem' }}>
      <CCardImage orientation="top" src={ReactImg} />
      <CCardBody>
        <CCardTitle>{data ? data.name : 'Loading...'}</CCardTitle>
        <CCardText>
          Email: {data ? data.email : 'Loading...'}<br />
          <br />
          Nomor Hp: {data ? data.phone : 'Loading...'}
        </CCardText>
        <CButton color="primary" href="#">Ubah</CButton>
      </CCardBody>
    </CCard>
  </CCol>
}
