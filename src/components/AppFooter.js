import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-32">
      <div>
        <a href="https://cakson.my.id/" target="_blank" rel="noopener noreferrer">
          Create By Anggun Caksono
        </a>
      </div>
      <div className="ms-auto">
        <p className="mt-2 fw-bold">Winnicode Garuda Teknologi</p>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
