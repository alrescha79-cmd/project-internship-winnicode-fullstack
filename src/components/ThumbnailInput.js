import React from 'react'
import { CFormInput } from '@coreui/react'

const ThumbnailInput = ({ handleImageChange }) => {
    return (
        <CFormInput
            type="file"
            size="lg"
            id="formFileLg"
            label="Thumbnail Berita"
            onChange={handleImageChange}
        />
    )
}

export default ThumbnailInput