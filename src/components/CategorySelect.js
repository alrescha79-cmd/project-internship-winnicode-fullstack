import React from 'react'
import { CFormSelect } from '@coreui/react'

const CategorySelect = ({ category, categories, handleCategoryChange }) => {
    return (
        <CFormSelect
            aria-label="Kategori Berita"
            value={category}
            options={categories}
            onChange={handleCategoryChange}
        />
    )
}

export default CategorySelect