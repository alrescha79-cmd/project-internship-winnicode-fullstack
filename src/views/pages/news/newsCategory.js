import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CForm, CFormInput, CRow } from '@coreui/react'

const FormCategory = <CForm className="row g-3 mb-4">
  <CCol xs="auto">
    <CFormInput type="text" id="staticEmail2" defaultValue="Tambah Kategori" readOnly plainText />
  </CCol>
  <CCol xs="auto">
    <CFormInput type="text" id="inputCategory" placeholder="Nama Kategori" />
  </CCol>
  <CCol xs="auto">
    <CButton color="primary" type="submit" className="mb-3">
      Simpan
    </CButton>
  </CCol>
</CForm>
const newsCategory = () => {
  return (
    <>
      {FormCategory}
      <CRow className='mb-4'>
        <CCol sm={6}>
          <CCard>
            <CCardHeader as="h5">Olahraga</CCardHeader>
            <CCardBody>
              <CCardTitle>10 Berita</CCardTitle>
              <CCardText>Berita terbaru seputar olahraga</CCardText>
              <CButton color="primary" href="#">
                Lihat Berita
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6}>
          <CCard>
            <CCardHeader as="h5">Olahraga</CCardHeader>
            <CCardBody>
              <CCardTitle>10 Berita</CCardTitle>
              <CCardText>Berita terbaru seputar olahraga</CCardText>
              <CButton color="primary" href="#">
                Lihat Berita
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={6}>
          <CCard>
            <CCardHeader as="h5">Olahraga</CCardHeader>
            <CCardBody>
              <CCardTitle>10 Berita</CCardTitle>
              <CCardText>Berita terbaru seputar olahraga</CCardText>
              <CButton color="primary" href="#">
                Lihat Berita
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6}>
          <CCard>
            <CCardHeader as="h5">Olahraga</CCardHeader>
            <CCardBody>
              <CCardTitle>10 Berita</CCardTitle>
              <CCardText>Berita terbaru seputar olahraga</CCardText>
              <CButton color="primary" href="#">
                Lihat Berita
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default newsCategory
