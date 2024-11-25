import React, { useEffect, useState } from 'react'
import { CForm, CAlert, CButton } from '@coreui/react'
import TitleInput from '../../../components/TitleInput'
import ThumbnailInput from '../../../components/ThumbnailInput'
import CategorySelect from '../../../components/CategorySelect'
import CategoryModal from '../../../components/CategoryModal'
import ContentEditor from '../../../components/ContentEditor'
import useFirebaseAuthToken from '../../../hook/useFirebaseAuthToken'
import { fetchData, postData } from '../../../api'

const NewPost = () => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const user = useFirebaseAuthToken()
  const [modalVisible, setModalVisible] = useState(false)
  const [newCategory, setNewCategory] = useState('')

  useEffect(() => {
    const getCategories = async () => {
      if (user) {
        try {
          const response = await fetchData(`${import.meta.env.VITE_API}/news`, user)
          const categories = response.data.reduce((acc, news) => {
            if (!acc.includes(news.category)) {
              acc.push(news.category)
            }
            return acc
          }, ['Pilih Kategori'])
          setCategories(categories.map(cat => ({ label: cat, value: cat })))
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    getCategories()
  }, [user])

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

  const handleSubmit = async () => {
    if (!title || !image || !category || !content) {
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
      formData.append('thumbnail', image)
      formData.append('category', category)
      formData.append('content', content)

      const response = await postData(`${import.meta.env.VITE_API}/news`, formData, user.token)

      setTitle('')
      setImage('')
      setCategory('')
      setContent('')
      setSuccess('Berita berhasil diposting!')
      setTimeout(() => setSuccess(''), 3000)

    } catch (error) {
      console.error('Error posting news:', error)
      setError('Gagal memposting berita.')
      setTimeout(() => setError(''), 3000)
    } finally {
      setIsSubmitting(false)
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

  return (
    <>
      <div>
        <h1 className="text-center mb-4">Posting Berita</h1>
        <div className="flex gap-2">
          <CForm>
            <TitleInput title={title} handleTitleChange={handleTitleChange} />
          </CForm>
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
              className="mt-4"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Memposting...' : 'Post Berita'}
            </CButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewPost