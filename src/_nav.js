import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilSpeedometer,
  cilStar,
  cilCalendar,
  cilWheelchair,
  cilUserFemale,
  cilChart,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Kelola Berita',
    to: '/news',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Posting Berita',
    to: '/news/post',
    icon: <CIcon icon={cilWheelchair} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kategory Berita',
    to: '/news/category',
    icon: <CIcon icon={cilUserFemale} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Penulis',
    to: '/author',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
]

export default _nav
