import React, { useEffect, useState } from 'react'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData } from '../../../api'
import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'

const NewsCategory = () => {
  const [data, setData] = useState([])
  const token = useFirebaseAuthToken()

  useEffect(() => {
    const getData = async () => {
      if (token) {
        try {
          const response = await fetchData('http://localhost:3000/news', token)
          setData(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    getData()
  }, [token])

  // Kelompokkan data berdasarkan kategori dan hitung jumlah berita untuk setiap kategori
  const groupedData = data.reduce((acc, news) => {
    const category = news.category
    if (!acc[category]) {
      acc[category] = { category, newsCount: 0 }
    }
    acc[category].newsCount += 1
    return acc
  }, {})

  // Konversi objek hasil pengelompokan menjadi array
  const uniqueData = Object.values(groupedData)

  return (
    <>
      <h1 className='text-center mt-2 mb-4'>Kategori Berita</h1>
      <CRow className='mb-4'>
        {uniqueData.map((category, index) => (
          <CCol sm={6} key={index}>
            <CCard className='mb-4'>
              <CCardHeader as="h4" className='text-center'>{category.category}</CCardHeader>
              <CCardBody>
                <CCardTitle>{category.newsCount} Berita</CCardTitle>
                <CCardText>Berita tentang <b>{category.category}</b></CCardText>
                <CButton color="primary" href="#">
                  Lihat Berita
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default NewsCategory