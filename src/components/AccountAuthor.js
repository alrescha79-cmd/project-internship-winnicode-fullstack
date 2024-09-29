import React from 'react'
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton, CCol } from '@coreui/react'
import ReactImg from '../assets/images/avatars/7.jpg'
import { useNavigate } from 'react-router-dom'

const AccountAuthor = ({ data }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/author/edit/${data.id}`);
    }

    const handleDetail = () => {
        navigate(`/author/detail/${data.id}`);
    }

    return (
        <CCol sm={3}>
            <CCard style={{ width: '18rem' }}>
                <CCardImage orientation="top" src={data ? data.profilePicture : 'Loading...'} alt={data ? data.name : 'Loading...'} />
                <CCardBody>
                    <CCardTitle>{data ? data.name : 'Loading...'}</CCardTitle>
                    <CCardText>
                        Jumlah Postingan: <b>{data ? data.postCount || 'Belum Ada Postingan' : 'Loading...'}</b>
                    </CCardText>
                    <CButton color="secondary me-2" onClick={handleEdit}>Edit</CButton>
                    <CButton color="primary" onClick={handleDetail}>Detail</CButton>
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default AccountAuthor