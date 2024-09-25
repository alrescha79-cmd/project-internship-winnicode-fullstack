import React, { useEffect, useState } from 'react'
import { CForm, CAlert, CButton } from '@coreui/react'
import TitleInput from '../../../components/TitleInput'
import ThumbnailInput from '../../../components/ThumbnailInput'
import CategorySelect from '../../../components/CategorySelect'
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
  const token = useFirebaseAuthToken()

  useEffect(() => {
    const getCategories = async () => {
      if (token) {
        try {
          const response = await fetchData('http://localhost:3000/news', token)
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
  }, [token])


  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0])
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleSubmit = () => {
    if (!title || !content) {
      setError('Semua field harus diisi.')
      return
    }

    setError('Terjadi kesalahan. Silakan coba lagi.')
    console.log('Judul Berita:', title)
    console.log('Thumbnail Berita:', image)
    console.log('Kategori Berita:', category)
    console.log('Posting Berita:', content)
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
          </div>
          <div className="mt-4">
            <CForm>
              <ContentEditor content={content} setContent={setContent} />
            </CForm>
          </div>
          {error && (
            <CAlert color="danger" className="mt-4">
              {error}
            </CAlert>
          )}
          <div>
            <CButton color="primary" className="mt-4" onClick={handleSubmit}>Post Berita</CButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewPost