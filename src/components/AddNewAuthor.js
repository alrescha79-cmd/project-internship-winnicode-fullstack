import React from 'react'
import { CForm, CFormInput, CButton } from '@coreui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const AddNewAuthor = ({ newAuthor, setNewAuthor, handleAddAuthor }) => {
    const handleChange = (e) => {
        const { name, value } = e.target
        setNewAuthor(prevState => ({ ...prevState, [name]: value }))
    }

    return (
        <CForm className='mt-4' onSubmit={handleAddAuthor}>
            <CFormInput
                type="text"
                id="name"
                name="name"
                label="Nama Penulis"
                placeholder="Masukkan nama penulis"
                aria-describedby="exampleFormControlInputHelpInline"
                className='mb-2'
                value={newAuthor.name}
                onChange={handleChange}
            />
            <CFormInput
                type="email"
                id="email"
                name="email"
                label="Email Penulis"
                placeholder="nama@email.com"
                aria-describedby="exampleFormControlInputHelpInline"
                className='mb-2'
                value={newAuthor.email}
                onChange={handleChange}
            />
            <PhoneInput
                country={'id'}
                value={newAuthor.phone}
                onChange={phone => setNewAuthor(prevState => ({ ...prevState, phone }))}
                inputStyle={{ width: '100%', marginBottom: '10px' }}
            />
            <CButton type="submit" color="primary" className='mt-4 me-2'>Simpan</CButton>
            <CButton type="button" color="danger" className='mt-4' onClick={() => setNewAuthor({ name: '', email: '', phone: '' })}>Batal</CButton>
        </CForm>
    )
}

export default AddNewAuthor