import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          MiRA
        </a>
        <span className="ms-1">&copy; 2024 MiRa Developer Teams.</span>
      </div>
      <div className="ms-auto">
        <p className="mt-2 fw-bold">Bangkit Academy 2024 Batch 1</p>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
