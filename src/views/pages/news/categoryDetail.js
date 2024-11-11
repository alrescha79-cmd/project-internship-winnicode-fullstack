import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData } from '../../../api'
import { CButton, CCard, CCardBody, CCardText, CCardTitle, CCol, CImage, CRow } from '@coreui/react'

function CategoryDetailPage() {
  const [data, setData] = useState([])
  const user = useFirebaseAuthToken()
  const { category } = useParams()

  useEffect(() => {
    const getData = async () => {
      if (user && category) {
        try {
          const encodedCategory = encodeURIComponent(category)
          const response = await fetchData(`${import.meta.env.VITE_API}/news/category/${encodedCategory}`, user.token)
          setData(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    getData()
  }, [user, category])

  return (
    <>
      <h1 className='text-center mb-4'>Berita Tentang {category}</h1>
      <button className="btn btn-secondary mb-4" onClick={() => window.history.back()}>Kembali</button>
      <CRow>
        {data.length > 0 ? (
          data.map((newsItem, index) => (
            <CCol sm={6} md={4} lg={3} key={index} className='mb-4'>
              <CCard>
                <CImage orientation="top" thumbnail width={'100%'} height={'200px'} src={newsItem.thumbnailURL} />
                <CCardBody>
                  <CCardTitle>{newsItem.title}</CCardTitle>
                  <CCardText dangerouslySetInnerHTML={{ __html: newsItem.content.substring(0, 100)}}>
                    
                  </CCardText>
                  <CButton color="primary" href={`/news/${newsItem.slug}`}>Baca Selengkapnya</CButton>
                </CCardBody>
              </CCard>
            </CCol>
          ))
        ) : (
          <p className='text-center'>Tidak ada berita untuk kategori ini.</p>
        )}
      </CRow>
    </>
  )
}

export default CategoryDetailPage