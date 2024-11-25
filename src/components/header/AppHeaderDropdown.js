import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CSpinner,
} from '@coreui/react'
import useFirebaseAuthToken from '../../hook/useFirebaseAuthToken'
import { fetchData } from '../../api'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const user = useFirebaseAuthToken()
  const [profilePicture, setProfilePicture] = useState(null)
  const [userId, setUserId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getUserData = async () => {
      if (user && user.uid && user.token) {
        try {
          const response = await fetchData(`${import.meta.env.VITE_API}/journalist/${user.uid}`, user.token)
          setProfilePicture(response.profilePicture)
          setUserId(response.id)
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }

    getUserData()
  }, [user])

  const handleNavigate = (path) => {
    navigate(path)
  }
  

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        {profilePicture ? (
          <CAvatar src={profilePicture} size="md" />
        ) : (
          <CSpinner color="primary" />
        )}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => handleNavigate(`/author/detail/${userId}`)}>
          Detail
        </CDropdownItem>
        <CDropdownItem onClick={() => handleNavigate(`/author/edit/${userId}`)}>
          Edit
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
