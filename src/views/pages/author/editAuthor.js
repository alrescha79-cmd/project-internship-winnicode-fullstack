import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken';
import { fetchData, putData } from '../../../api';
import { CAlert, CButton, CForm, CFormInput, CImage } from '@coreui/react';

const EditAuthorPage = () => {
    const [originalData, setOriginalData] = useState(null); // Original data fetched from the API
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        profilePicture: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const user = useFirebaseAuthToken();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            if (user && id) {
                try {
                    const response = await fetchData(`${import.meta.env.VITE_API}/journalist/${id}`, user.token);
                    setOriginalData(response);
                    setFormData({
                        name: response.name,
                        email: response.email,
                        phone: response.phone || '',
                        profilePicture: response.profilePicture || '',
                        password: '',
                        confirmPassword: '',
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        getData();
    }, [user, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            profilePicture: file,
        });
    };

    const isFormUnchanged = () => {
        if (!originalData) return true;

        return (
            formData.name === originalData.name &&
            formData.email === originalData.email &&
            formData.phone === originalData.phone &&
            formData.profilePicture === originalData.profilePicture &&
            !formData.password &&
            !formData.confirmPassword
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormUnchanged()) {
            alert('No changes detected.');
            return;
        }

        if (formData.password && formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setLoading(true);

        try {
            const updateFormData = new FormData();
            updateFormData.append('name', formData.name);
            updateFormData.append('email', formData.email);
            updateFormData.append('phone', formData.phone);
            if (formData.password) updateFormData.append('password', formData.password);
            if (formData.profilePicture instanceof File) {
                updateFormData.append('profilePicture', formData.profilePicture);
            }

            await putData(`${import.meta.env.VITE_API}/journalist/${id}`, updateFormData, user.token);

            alert('Author updated successfully!');
            window.history.back();
        } catch (error) {
            console.error('Error updating author:', error);
            alert('Failed to update author. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <CButton color="primary" onClick={() => window.history.back()}>
                Kembali
            </CButton>
            <h1 className="text-center mb-4 mt-4">Ubah Akun</h1>
            <div>
                <CForm className="mt-4" onSubmit={handleSubmit}>
                    <div className="border p-4 mb-4">
                        <div className="d-flex align-items-center mb-4">
                            <CImage
                                src={
                                    formData.profilePicture instanceof File
                                        ? URL.createObjectURL(formData.profilePicture)
                                        : originalData?.profilePicture || ''
                                }
                                alt={formData.name || 'Loading...'}
                                width={200}
                                height={200}
                                className="rounded-circle me-4"
                            />
                            <div className="d-flex flex-column">
                                <label htmlFor="formFileLg" className="mb-2">
                                    Pilih Foto Profil
                                </label>
                                <CFormInput
                                    type="file"
                                    size="lg"
                                    id="formFileLg"
                                    className="mb-2"
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
                            className="mb-2"
                            required
                        />
                        <CFormInput
                            type="email"
                            id="email"
                            name="email"
                            label="Email Penulis"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="nama@email.com"
                            className="mb-2"
                            required
                        />
                        <CFormInput
                            type="text"
                            id="phone"
                            name="phone"
                            label="Nomor Telepon"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Masukkan nomor telepon"
                            className="mb-2"
                            required
                        />
                        <CButton
                            type="submit"
                            color="primary"
                            className="mt-4"
                            disabled={loading || isFormUnchanged()}
                        >
                            {loading ? 'Loading...' : isFormUnchanged() ? 'Simpan' : 'Simpan Perubahan'}
                        </CButton>
                    </div>
                    <div className="border p-4 mb-4">
                        <h3 className="mb-2">Ubah Password</h3>
                        <CFormInput
                            type="password"
                            id="password"
                            name="password"
                            label="Password Baru"
                            placeholder="Masukkan password baru"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="mb-2"
                        />
                        <CFormInput
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            label="Konfirmasi Password Baru"
                            placeholder="Konfirmasi password baru"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="mb-2"
                        />
                        <CButton
                            type="submit"
                            color="primary"
                            className="mt-4"
                            disabled={loading || isFormUnchanged()}
                        >
                            {loading ? 'Loading...' : isFormUnchanged() ? 'Simpan' : 'Simpan Perubahan'}
                        </CButton>
                    </div>
                </CForm>
            </div>
        </>
    );
};

export default EditAuthorPage;
