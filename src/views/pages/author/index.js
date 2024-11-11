import React, { useEffect, useState } from 'react'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData, postData } from '../../../api'
import { CRow, CCol, CCard, CCardBody, CCardTitle, CButton } from '@coreui/react'
import AddNewAuthor from '../../../components/AddNewAuthor'
import AccountAuthor from '../../../components/AccountAuthor'
import ListAuthors from '../../../components/ListAuthors'

const Author = () => {
  const [data, setData] = useState(null)
  const [authors, setAuthors] = useState([])
  const [newAuthor, setNewAuthor] = useState({ name: '', email: '', phone: '' })
  const [editAuthor, setEditAuthor] = useState(null)
  const user = useFirebaseAuthToken()

  useEffect(() => {
    const getData = async () => {
      if (user && user.uid && user.token) {
        try {
          const response = await fetchData(`${import.meta.env.VITE_API}/journalist/${user.uid}`, user.token)
          setData(response)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    const getAuthors = async () => {
      if (user && user.token) {
        try {
          const response = await fetchData(`${import.meta.env.VITE_API}/journalist`, user.token)
          setAuthors(response)
        } catch (error) {
          console.error('Error fetching authors:', error)
        }
      }
    }

    getData()
    getAuthors()
  }, [user])

  const handleAddAuthor = async (event) => {
    event.preventDefault()
    if (user && user.token) {
      try {
        const response = await postData(`${import.meta.env.VITE_API}/journalist/add`, newAuthor, user.token)
        setAuthors([...authors, response])
        setNewAuthor({ name: '', email: '', phone: '' }) 
      } catch (error) {
        console.error('Error adding author:', error)
      }
    }
  }

  return (
    <>
      <CRow className='mb-4'>
        <AccountAuthor data={data} />
        <CCol sm={9}>
          <CCard>
            <CCardBody>
              <CCardTitle className='text-center'>Tambah Penulis Baru</CCardTitle>
              <hr />
              <AddNewAuthor newAuthor={newAuthor} setNewAuthor={setNewAuthor} handleAddAuthor={handleAddAuthor} />
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