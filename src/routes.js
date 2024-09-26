// src/routes.js
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const News = React.lazy(() => import('./views/pages/news'))
const NewsDetail = React.lazy(() => import('./views/pages/news/detail'))
const NewPost = React.lazy(() => import('./views/pages/news/newPost'))
const NewsCategory = React.lazy(() => import('./views/pages/news/newsCategory'))
const Author = React.lazy(() => import('./views/pages/author'))

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
    path: '/news/:slug',
    name: 'Detail Berita',
    element: NewsDetail,
  },
  {
    path: '/news/post',
    name: 'Posting Berita',
    element: NewPost,
  },
  {
    path: '/news/category',
    name: 'Kategori Berita',
    element: NewsCategory,
  },
  {
    path: '/author',
    name: 'Penulis',
    element: Author,
  },
]

export default routes
