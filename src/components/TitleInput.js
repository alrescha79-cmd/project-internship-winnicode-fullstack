import React from 'react'
import { CFormInput } from '@coreui/react'

const TitleInput = ({ title, handleTitleChange }) => {
    return (
        <CFormInput
            type="text"
            id="exampleFormControlInput1"
            label="Judul Berita"
            placeholder="Judul Berita"
            aria-describedby="exampleFormControlInputHelpInline"
            value={title}
            onChange={handleTitleChange}
        />
    )
}

export default TitleInput