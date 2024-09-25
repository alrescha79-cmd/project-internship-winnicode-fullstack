import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CFormInput, CButton, CAlert } from '@coreui/react'

const CategoryModal = ({ visible, onClose, onSubmit, onChange, error }) => {
    return (
        <CModal alignment='center' visible={visible} onClose={onClose}>
            <CModalHeader>
                <CModalTitle>Tambah Kategori Baru</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CFormInput
                    type="text"
                    id="newCategoryInput"
                    label="Kategori Baru"
                    placeholder="Kategori Baru"
                    aria-describedby="newCategoryInputHelpInline"
                    onChange={onChange}
                />
                {error && (
                    <CAlert color="danger" className="mt-4">
                        {error}
                    </CAlert>
                )}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>Batal</CButton>
                <CButton color="primary" onClick={onSubmit}>Tambah</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default CategoryModal