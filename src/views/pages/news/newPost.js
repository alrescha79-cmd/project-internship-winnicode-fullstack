import React from 'react'
import { CForm, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react'

const newPost = () => {
  return (
    <>
      <div>
        <h1 className="text-center mb-4">Posting Berita </h1>
        <div className="flex gap-2">
          <CFormInput
            className="my-2"
            placeholder="Judul Berita"
            id="floatingInput"
            floatingLabel="Judul Berita"
            type="text"
          />
          <div className="mt-4">
            <CFormInput type="file" size="lg" id="formFileLg" label="Thumbnail Berita" />
          </div>
          <div className="mt-4">
            <CForm>
              <CFormTextarea
                id="exampleFormControlTextarea1"
                label="Isi Berita"
                rows={6}
                text="Silakan isi berita yang ingin diposting"
              ></CFormTextarea>
            </CForm>
          </div>
          <div className="mt-4">
            <CFormSelect
              aria-label="Kategori Berita"
              options={[
                'Silakan pilih kategori berita',
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' },
                { label: 'Three', value: '3', disabled: true },
              ]}
            />
          </div>
          <div className="mt-4">
            <button className="btn btn-primary">Post Berita</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default newPost
