import React from 'react'
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton, CContainer, CRow, CCol, CForm, CFormInput, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'
import ReactImg from '../../../assets/images/avatars/7.jpg'

const Author = () => {
  return (
    <>
      <CRow className='mb-4'>
        <CCol sm={3}>
          <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={ReactImg} />
            <CCardBody>
              <CCardTitle>Nama Penulis</CCardTitle>
              <CCardText>
                Email: penulis@email.com
                <br />
                No. Hp: 081234567890
              </CCardText>
              <CButton color="primary" href="#">Ubah</CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={9}>
          <CCard>
            <CCardBody>
              <CCardTitle className='text-center'>Tambah Penulis Baru</CCardTitle>
              <hr />
              <CForm className='mt-4'>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  label="Nama Penulis"
                  placeholder="Masukkan nama penulis"
                  aria-describedby="exampleFormControlInputHelpInline"
                  className='mb-2'
                />
                <CFormInput
                  type="email"
                  id="exampleFormControlInput1"
                  label="Email Penulis"
                  placeholder="nama@email.com"
                  aria-describedby="exampleFormControlInputHelpInline"
                  className='mb-2'
                />
                <CFormInput
                  type="number"
                  id="exampleFormControlInput1"
                  label="Nomor Telepon"
                  placeholder="6281234567890"
                  aria-describedby="exampleFormControlInputHelpInline"
                  className='mb-2'
                />
                <CFormInput type="file" size="sm" id="formFileSm" label="Foto Penulis" />
                <CButton color="primary" className='mt-4'>Simpan</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <hr />
      <h4>Daftar Penulis</h4>
      <CTable className='mt-4' striped>
        <CTableHead >
          <CTableRow>
            <CTableHeaderCell scope="col">No.</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nama Penulis</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Jumlah Postingan</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>Mark</CTableDataCell>
            <CTableDataCell>@mdo</CTableDataCell>
            <CTableDataCell>2</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>Jacob</CTableDataCell>
            <CTableDataCell>@fat</CTableDataCell>
            <CTableDataCell>4</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default Author
