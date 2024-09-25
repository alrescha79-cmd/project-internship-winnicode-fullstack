import React, { useState, useEffect } from 'react'
import { CForm, CFormInput, CFormSelect, CAlert, CButton } from '@coreui/react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import CategoryModal from '../../../components/CategoryModal'

const NewPost = () => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [error, setError] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [categories, setCategories] = useState([
    { label: 'Silakan pilih kategori berita', value: '' },
    { label: 'Olahraga', value: 'olahraga' },
    { label: 'Politik', value: 'politik' },
    { label: 'Gaya Hidup', value: 'gaya hidup' },
    { label: 'Tambah Kategori', value: 'tambah_kategori' },
  ])

  useEffect(() => {
    const quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Silakan isi berita yang ingin diposting',
      modules: {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' },
          { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image', 'video'],
          ['clean']
        ],
      },
    })

    quill.on('text-change', () => {
      setContent(quill.root.innerHTML)
    })
  }, [])

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleCategoryChange = (event) => {
    const value = event.target.value
    if (value === 'tambah_kategori') {
      setIsAddingCategory(true)
      setModalVisible(true)
      setCategory('')
    } else {
      setIsAddingCategory(false)
      setCategory(value)
    }
  }

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value)
  }

  const handleSubmit = () => {
    const finalCategory = isAddingCategory ? newCategory : category

    if (!title || !content || !finalCategory) {
      setError('Semua field harus diisi.')
      return
    }

    setError('')
    console.log('Judul Berita:', title)
    console.log('Posting Berita:', content)
    console.log('Kategori Berita:', finalCategory)
  }

  const handleModalSubmit = () => {
    if (!newCategory) {
      setError('Kategori baru harus diisi.')
      return
    }
    setCategories([...categories.filter(cat => cat.value !== 'tambah_kategori'), { label: newCategory, value: newCategory }, { label: 'Tambah Kategori', value: 'tambah_kategori' }])
    setCategory(newCategory)
    setIsAddingCategory(false)
    setModalVisible(false)
    setError('')
  }

  return (
    <>
      <div>
        <h1 className="text-center mb-4">Posting Berita</h1>
        <div className="flex gap-2">
          <CForm>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label="Judul Berita"
              placeholder="Judul Berita"
              aria-describedby="exampleFormControlInputHelpInline"
              onChange={handleTitleChange}
            />
          </CForm>
          <div className="mt-4">
            <CFormInput type="file" size="lg" id="formFileLg" label="Thumbnail Berita" />
          </div>
          <div className="mt-4">
            <CFormSelect
              aria-label="Kategori Berita"
              value={category}
              options={categories}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="mt-4">
            <CForm>
              <label htmlFor="editor">Isi Berita</label>
              <div id="editor" style={{ height: '200px' }}></div>
            </CForm>
          </div>
          {error && (
            <CAlert color="danger" className="mt-4">
              {error}
            </CAlert>
          )}
          <div>
            <button className="btn btn-primary mt-4" onClick={handleSubmit}>Post Berita</button>
          </div>
        </div>
      </div>

      <CategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleModalSubmit}
        onChange={handleNewCategoryChange}
        error={error}
      />
    </>
  )
}

export default NewPost