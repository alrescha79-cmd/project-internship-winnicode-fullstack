import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData, postData } from '../../../api'
import { CAlert, CButton, CForm, CImage } from '@coreui/react'
import ContentEditor from '../../../components/ContentEditor'
import CategorySelect from '../../../components/CategorySelect'
import CategoryModal from '../../../components/CategoryModal'
import ThumbnailInput from '../../../components/ThumbnailInput'
import TitleInput from '../../../components/TitleInput'

function EditPage() {
    const [data, setData] = useState(null)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState('')
    const [content, setContent] = useState('')
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    const user = useFirebaseAuthToken()
    const { slug } = useParams()

    useEffect(() => {
        const getData = async () => {
            if (user && slug) {
                try {
                    const response = await fetchData(`${import.meta.env.VITE_API}/news/${slug}`, user.token)
                    const newsData = response.data
                    setData(newsData)
                    setTitle(newsData.title)
                    setCategory(newsData.category)
                    setContent(newsData.content)
                    setImage(newsData.thumbnailURL)
                } catch (error) {
                    console.error('Error fetching data:', error)
                    setError('Error fetching data.')
                }
            }
        }

        const getCategories = async () => {
            if (user) {
                try {
                    const response = await fetchData(`${import.meta.env.VITE_API}/news`, user.token)
                    const categories = response.data.reduce((acc, news) => {
                        if (!acc.includes(news.category)) {
                            acc.push(news.category)
                        }
                        return acc
                    }, ['Pilih Kategori'])
                    setCategories(categories.map(cat => ({ label: cat, value: cat })))
                } catch (error) {
                    console.error('Error fetching categories:', error)
                }
            }
        }

        getData()
        getCategories()
    }, [user, slug])

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value
        if (selectedCategory === 'add-new-category') {
            setModalVisible(true)
        } else {
            setCategory(selectedCategory)
        }
    }

    const handleNewCategoryChange = (event) => {
        setNewCategory(event.target.value)
    }

    const handleAddNewCategory = () => {
        if (newCategory && !categories.some(cat => cat.value === newCategory)) {
            setCategories([...categories, { label: newCategory, value: newCategory }])
            setCategory(newCategory)
            setModalVisible(false)
            setNewCategory('')
        } else {
            setError('Kategori sudah ada atau nama kategori tidak valid.')
        }
    }

    const handleCloseModal = () => {
        setModalVisible(false)
        setNewCategory('')
        setError('')
    }

    const handleSubmit = async () => {
        if (!title || !content || !category) {
            setError('Semua field harus diisi.')
            setTimeout(() => setError(''), 3000)
            return
        }

        setIsSubmitting(true)
        setError('')
        setSuccess('')

        try {
            const formData = new FormData()
            formData.append('title', title)
            if (image instanceof File) {
                formData.append('thumbnail', image)
            }
            formData.append('category', category)
            formData.append('content', content)

            const response = await postData(`${import.meta.env.VITE_API}/news/${slug}`, formData, user.token)

            setSuccess('Berita berhasil diperbarui!')
            setTimeout(() => setSuccess(''), 3000)

        } catch (error) {
            console.error('Error updating news:', error)
            setError('Gagal memperbarui berita.')
            setTimeout(() => setError(''), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <div>
                <h1 className="text-center mb-4">Edit Berita</h1>
                <div className="flex gap-2">
                    <CForm>
                        <TitleInput title={title} handleTitleChange={handleTitleChange} />
                    </CForm>
                    {image && (
                        <CImage src={typeof image === 'string' ? image : URL.createObjectURL(image)} fluid thumbnail width={'400px'} />
                    )}
                    <div className="mt-4">
                        <ThumbnailInput handleImageChange={handleImageChange} />
                    </div>
                    <div className="mt-4">
                        <CategorySelect category={category} categories={categories} handleCategoryChange={handleCategoryChange} />
                        <CategoryModal
                            visible={modalVisible}
                            onClose={handleCloseModal}
                            onSubmit={handleAddNewCategory}
                            onChange={handleNewCategoryChange}
                            error={error}
                        />
                    </div>
                    <div className="mt-4">
                        <CForm>
                            <ContentEditor value={content} onChange={setContent} />
                        </CForm>
                    </div>
                    {error && (
                        <CAlert color="danger" className="mt-4">
                            {error}
                        </CAlert>
                    )}
                    {success && (
                        <CAlert color="success" className="mt-4">
                            {success}
                        </CAlert>
                    )}
                    <div>
                        <CButton
                            color="primary"
                            className="mt-4 me-2"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Memperbarui...' : 'Perbarui Berita'}
                        </CButton>
                        <CButton
                            color="danger"
                            className="mt-4"
                            onClick={() => window.history.back()}
                        >Kembali</CButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPage