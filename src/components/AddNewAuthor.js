import React from 'react'
import { CForm, CFormInput, CButton, CAlert } from '@coreui/react'
import '../css/author/author.css'

const AddNewAuthor = ({ newAuthor, setNewAuthor, handleAddAuthor, error }) => {
    const handleChange = (e) => {
        const { name, value } = e.target

        // Jika field telepon, tambahkan logika untuk otomatisasi kode negara
        if (name === 'phone') {
            const cleanedValue = value.replace(/\D/g, '') // Hapus karakter non-numeric
            const prefixedValue = cleanedValue.startsWith('62') ? `+${cleanedValue}` : `+62${cleanedValue}`
            setNewAuthor((prevState) => ({ ...prevState, phone: prefixedValue }))
        } else {
            setNewAuthor((prevState) => ({ ...prevState, [name]: value }))
        }
    }

    const handleReset = () => {
        setNewAuthor({ name: '', email: '', phone: '' })
    }

    return (
        <CForm
            className="mt-4"
            onSubmit={(e) => {
                e.preventDefault()
                handleAddAuthor()
            }}
        >
            {/* Input Nama Penulis */}
            <CFormInput
                type="text"
                id="name"
                name="name"
                label="Nama Penulis"
                placeholder="Masukkan nama penulis"
                className="mb-2"
                value={newAuthor.name}
                onChange={handleChange}
                required
            />

            {/* Input Email Penulis */}
            <CFormInput
                type="email"
                id="email"
                name="email"
                label="Email Penulis"
                placeholder="nama@email.com"
                className="mb-2"
                value={newAuthor.email}
                onChange={handleChange}
                required
            />

            {/* Input Nomor Telepon */}
            <CFormInput
                type="tel"
                id="phone"
                name="phone"
                label="Nomor Telepon"
                placeholder="Masukkan nomor telepon"
                className="mb-2"
                value={newAuthor.phone}
                onChange={handleChange}
                required
            />

            {/* Pesan Kesalahan */}
            {error && <CAlert color="danger" className="mt-2">{error}</CAlert>}

            {/* Tombol Simpan dan Batal */}
            <CButton type="submit" color="primary" className="mt-4 me-2">
                Simpan
            </CButton>
            <CButton type="button" color="danger" className="mt-4" onClick={handleReset}>
                Batal
            </CButton>
        </CForm>
    )
}

export default AddNewAuthor
