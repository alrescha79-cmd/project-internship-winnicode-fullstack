import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { showErrorAlert } from '../../../utils/alertUtils'

// Initialize Firebase auth
const auth = getAuth()

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false)
  const navigate = useNavigate()

  // useEffect(() => {
  //   showErrorAlert(
  //     'Email: admin@mira.com\n\nPassword: adminmira\n\nOnly for demo purposes. Please do not change or delete any data.',
  //   )
  // }, [])

  const handleLogin = async () => {
    setHasAttemptedLogin(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      if (hasAttemptedLogin) {
        showErrorAlert(
          'Login Gagal, silahkan cek kembali email dan password Anda. Pastikan email dan password yang Anda masukkan benar.',
        )
      }
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="your@email.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4 w-100" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>WinniCode</h2>
                    <p>
                      Welcome to WinniCode. Please login to access the dashboard. If you do not have
                      contact the administrator.
                    </p>
                    <Link to="#">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Subscribe Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
