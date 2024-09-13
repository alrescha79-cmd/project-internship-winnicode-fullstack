// src/components/PrivateRoute.js
import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firestore'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRoute
