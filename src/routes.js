// src/routes.js
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const News = React.lazy(() => import('./views/pages/news'))
const NewsDetail = React.lazy(() => import('./views/pages/news/detail'))
const EditPage = React.lazy(() => import('./views/pages/news/edit'))
const NewPost = React.lazy(() => import('./views/pages/news/newPost'))
const NewsCategory = React.lazy(() => import('./views/pages/news/newsCategory'))
const CategoryDetail = React.lazy(() => import('./views/pages/news/categoryDetail'))
const Author = React.lazy(() => import('./views/pages/author'))
const EditAuthorPage = React.lazy(() => import('./views/pages/author/editAuthor'))
const DetailAuthorPage = React.lazy(() => import('./views/pages/author/detailAuthor'))

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
    path: '/news/edit/:slug',
    name: 'Edit Berita',
    element: EditPage,
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
    path: '/news/category/:category',
    name: 'Kategori Berita',
    element: CategoryDetail,
  },
  {
    path: '/author',
    name: 'Penulis',
    element: Author,
  },
  {
    path: '/author/edit/:id',
    name: 'Edit Penulis',
    element: EditAuthorPage,
  },
  {
    path: '/author/detail/:id',
    name: 'Detail Penulis',
    element: DetailAuthorPage,
  },
]

export default routes
