import React from 'react'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CSpinner } from '@coreui/react'

const ListAuthors = ({ authors }) => {
    return (
        <CTable className='mt-4' striped>
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
                            <CTableDataCell>{author.postCount || 0}</CTableDataCell>
                        </CTableRow>
                    ))
                ) : (
                    <CTableRow>
                        <CTableDataCell colSpan="4" className="text-center"><CSpinner /></CTableDataCell>
                    </CTableRow>
                )}
            </CTableBody>
        </CTable>
    )
}

export default ListAuthors