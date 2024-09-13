// src/routes.js
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const News = React.lazy(() => import('./views/pages/news'))
const NewPost = React.lazy(() => import('./views/pages/news/newPost'))

const Dokter = React.lazy(() => import('./views/pages/dokter'))
const Laporan = React.lazy(() => import('./views/pages/laporan'))
const TambahLaporan = React.lazy(() => import('./views/pages/laporan/TambahLaporan'))

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    element: Dashboard,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: Dashboard,
  },
  {
    path: '/news',
    name: 'Berita',
    element: News,
  },
  {
    path: '/news/post',
    name: 'Posting Berita',
    element: NewPost,
  },
  {
    path: '/dokter',
    name: 'Dokter',
    element: Dokter,
  },
  {
    path: '/laporan',
    name: 'Laporan',
    element: Laporan,
  },
  {
    path: '/tambah-laporan/:id',
    name: 'Tambah Laporan',
    element: TambahLaporan,
  },
]

export default routes
