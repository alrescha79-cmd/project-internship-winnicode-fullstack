import React from 'react'
import { CFormSelect } from '@coreui/react'

const CategorySelect = ({ category, categories, handleCategoryChange }) => {
    return (
        <CFormSelect
            aria-label="Kategori Berita"
            value={category}
            onChange={handleCategoryChange}
        >
            {categories.map((cat, index) => (
                <option key={index} value={cat.value}>
                    {cat.label}
                </option>
            ))}
            <option value="add-new-category">Tambah Kategori</option>
        </CFormSelect>
    )
}

export default CategorySelect