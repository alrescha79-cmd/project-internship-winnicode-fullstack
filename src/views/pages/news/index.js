import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTableComponent from '../../../../src/components/DataTable'

const columns = (navigate, reloadData) => [
  {
    name: 'Judul Berita',
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: 'Penulis',
    selector: (row) => row.author,
    sortable: true,
  },
  {
    name: 'Tanggal Posting',
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: 'Kategori',
    selector: (row) => row.category,
    sortable: true,
  },
  {
    name: 'Action',
    cell: (row) => (
      <div>
        <button
          className="btn btn-secondary text-white m-1"
          onClick={() => navigate(`/news/${row.id}`)}
        >
          Edit
        </button>
        <button
          className="btn btn-success text-white m-1"
          onClick={() => confirmAppointment(row.id, reloadData)}
        >
          Hapus
        </button>
      </div>
    ),
  },
]

const News = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [categoryFilter, setCategoryFilter] = useState('')
  const [searchName, setSearchName] = useState('')

  const News = [
    {
      id: 1,
      title: 'Berita 1',
      author: 'Penulis 1',
      date: '2023-01-01',
      category: 'Kategori 1',
    },
    {
      id: 2,
      title: 'Berita 2',
      author: 'Penulis 2',
      date: '2023-01-02',
      category: 'Kategori 2',
    },
    {
      id: 3,
      title: 'Berita 3',
      author: 'Penulis 3',
      date: '2023-01-03',
      category: 'Kategori 3',
    },
  ]

  const loadData = () => {
    let filteredData = News

    if (categoryFilter) {
      filteredData = filteredData.filter((row) => row.category === categoryFilter)
    }

    if (searchName) {
      filteredData = filteredData.filter((row) =>
        row.title.toLowerCase().includes(searchName.toLowerCase()),
      )
    }

    const sortedData = filteredData.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA - dateB
    })

    setData(sortedData)
  }

  const reloadData = () => {
    loadData()
  }

  useEffect(() => {
    loadData()
  }, [categoryFilter, searchName])

  const uniqueCategories = [...new Set(News.map((item) => item.category))]

  const filterOptions = {
    field: 'category',
    allLabel: 'Semua Kategori',
    default: '',
    options: uniqueCategories.map((category) => ({
      value: category,
      label: category,
    })),
  }

  const searchOptions = {
    field: 'title',
    placeholder: 'Cari Judul Berita',
  }

  return (
    <div>
      <DataTableComponent
        columns={columns(navigate, reloadData)}
        data={data}
        filterOptions={filterOptions}
        searchOptions={searchOptions}
        onFilterChange={setCategoryFilter}
        onSearchChange={setSearchName}
      />
    </div>
  )
}

export default News
