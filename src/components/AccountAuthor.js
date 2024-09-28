import React from 'react'
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton, CCol } from '@coreui/react'
import ReactImg from '../assets/images/avatars/7.jpg'

const AccountAuthor = ({ data }) => {
    return (
        <CCol sm={3}>
            <CCard style={{ width: '18rem' }}>
                <CCardImage orientation="top" src={ReactImg} />
                <CCardBody>
                    <CCardTitle>{data ? data.name : 'Loading...'}</CCardTitle>
                    <CCardText>
                        Jumlah Postingan: <b>{data ? data.postCount || 'Belum Ada Postingan' : 'Loading...'}</b>
                    </CCardText>
                    <CButton color="secondary me-2">Edit</CButton>
                    <CButton color="primary">Detail</CButton>
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default AccountAuthor