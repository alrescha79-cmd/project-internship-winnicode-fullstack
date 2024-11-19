import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData } from '../../../api'
import { CButton, CForm, CFormInput, CImage, CSpinner } from '@coreui/react'
import PhoneInput from 'react-phone-input-2'

const EditAuthorPage = () => {
    const [data, setData] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        profilePicture: ''
    })
    const user = useFirebaseAuthToken()
    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            if (user && id) {
                try {
                    const response = await fetchData(`${import.meta.env.VITE_API}/journalist/${id}`, user.token)
                    setData(response)
                    setFormData({
                        name: response.name,
                        email: response.email,
                        phone: response.phone || '',
                        profilePicture: response.profilePicture || ''
                    })
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }
        }

        getData()
    }, [user, id])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            phone: value
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFormData({
            ...formData,
            profilePicture: file
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Updated Data:', formData)
    }

    return (
        <>
            <CButton color="primary" onClick={() => window.history.back()}>Kembali</CButton>
            <h1 className="text-center mb-4 mt-4">Ubah Akun</h1>
            <div>
                <CForm className='mt-4' onSubmit={handleSubmit}>
                    <div className='border p-4 mb-4'>
                        <div className='d-flex align-items-center mb-4'>
                            <CImage
                                src={
                                    formData.profilePicture instanceof File
                                        ? URL.createObjectURL(formData.profilePicture)
                                        : data?.profilePicture || ''
                                }
                                alt={formData.name || 'Loading...'}
                                width={200}
                                height={200}
                                className="rounded-circle me-4"
                            />

                            <div className='d-flex flex-column'>
                                <label htmlFor="formFileLg" className='mb-2'>Pilih Foto Profil</label>
                                <CFormInput
                                    type="file"
                                    size="lg"
                                    id="formFileLg"
                                    className='mb-2'
                                    style={{ height: 'auto' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <CFormInput
                            type="text"
                            id="name"
                            name="name"
                            label="Nama Penulis"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Masukkan nama penulis"
                            className='mb-2'
                        />
                        <CFormInput
                            type="email"
                            id="email"
                            name="email"
                            label="Email Penulis"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="nama@email.com"
                            className='mb-2'
                        />
                        <PhoneInput
                            country={'id'}
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            inputStyle={{ width: '100%', marginBottom: '10px' }}
                        />
                        <CButton type="button" color="danger" className='mt-4 me-2' onClick={() => window.history.back()}>Batal</CButton>
                        <CButton type="submit" color="primary" className='mt-4'>Simpan</CButton>
                    </div>
                    <div className='border p-4 mb-4'>
                        <h3 className='mb-2'>Ubah Password</h3>
                        <CFormInput
                            type="password"
                            id="password"
                            name="password"
                            label="Password Baru"
                            placeholder="Masukkan password baru"
                            className='mb-2'
                        />
                        <CFormInput
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            label="Konfirmasi Password Baru"
                            placeholder="Konfirmasi password baru"
                            className='mb-2'
                        />
                        <CButton type="button" color="danger" className='mt-4 me-2' onClick={() => window.history.back()}>Batal</CButton>
                        <CButton type="submit" color="primary" className='mt-4'>Simpan</CButton>
                    </div>
                </CForm>
            </div>
        </>
    )
}

export default EditAuthorPage
