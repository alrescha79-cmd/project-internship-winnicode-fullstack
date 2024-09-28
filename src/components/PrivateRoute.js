// src/components/PrivateRoute.js
import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firestore'
import { CSpinner } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <div className="text-center mt-8">
      <CSpinner />
    </div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRoute
