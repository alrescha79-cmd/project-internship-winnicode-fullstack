import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData } from '../../../api'
import { CButton, CForm, CFormInput, CImage, CSpinner } from '@coreui/react'
import PhoneInput from 'react-phone-input-2'

const editAuthorPage = () => {
    const [data, setData] = useState(null)
    const user = useFirebaseAuthToken()
    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            if (user && id) {
                try {
                    const response = await fetchData(`${import.meta.env.VITE_API}/journalist/${id}`, user.token)
                    setData(response)
                    // console.log(response)
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }
        }

        getData()
    }
    , [user, id])



    return (
        <div>
            <CButton color="primary" onClick={() => window.history.back()}>Kembali</CButton>
            <h1>Edit Author</h1>
            <div>
            <CImage src={data ? data.profilePicture : <CSpinner color="primary" className='mb-4'/>} alt={data ? data.name : 'Loading...'} />
            <CForm className='mt-4'>
            <CFormInput
            type="file"
            size="lg"
            id="formFileLg"
            label="Ubah Foto Profil"
            className='mb-2'
            // onChange={handleImageChange}
        />
            <CFormInput
                type="text"
                id="name"
                name="name"
                label="Nama Penulis"
                placeholder="Masukkan nama penulis"
                aria-describedby="exampleFormControlInputHelpInline"
                className='mb-2'
                // value={newAuthor.name}
                // onChange={handleChange}
            />
            <CFormInput
                type="email"
                id="email"
                name="email"
                label="Email Penulis"
                placeholder="nama@email.com"
                aria-describedby="exampleFormControlInputHelpInline"
                className='mb-2'
                // value={newAuthor.email}
                // onChange={handleChange}
            />
            <CFormInput
                type="password"
                id="password"
                name="password"
                label="Password Baru"
                placeholder="********"
                aria-describedby="exampleFormControlInputHelpInline"
                className='mb-2'
                // value={newAuthor.email}
                // onChange={handleChange}
            />
            <PhoneInput
                country={'id'}
                // value={newAuthor.phone}
                // onChange={phone => setNewAuthor(prevState => ({ ...prevState, phone }))}
                inputStyle={{ width: '100%', marginBottom: '10px' }}
            />
            <CButton type="submit" color="primary" className='mt-4 me-2'>Simpan</CButton>
            <CButton type="button" color="danger" className='mt-4' >Batal</CButton>
        </CForm>
            </div>
        </div>
    )
}

export default editAuthorPage