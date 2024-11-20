import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;

  .search-input {
    width: 300px;
  }

  .filter-select {
    width: 250px;
  }

`

const CustomTableWrapper = styled.div`
  .rdt_Table {
    font-size: 16px;
  }
  .rdt_TableRow {
    height: 75px;
  }
  .rdt_TableCell {
    padding: 2px 2px;
  }
`

const DataTableComponent = ({ columns, data, filterOptions, searchOptions }) => {
  const [searchText, setSearchText] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filteredData, setFilteredData] = useState(data)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-coreui-theme') || 'light'
      setTheme(currentTheme)
    }

    updateTheme()

    const observer = new MutationObserver(() => {
      updateTheme()
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-coreui-theme'],
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    let tempData = data

    if (searchText) {
      tempData = tempData.filter((item) =>
        item[searchOptions.field].toLowerCase().includes(searchText.toLowerCase()),
      )
    }

    if (filterValue) {
      tempData = tempData.filter((item) => item[filterOptions.field] === filterValue)
    }

    setFilteredData(tempData)
  }, [searchText, filterValue, data, filterOptions?.field, searchOptions.field])

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  const customHeader = (
    <HeaderWrapper>
      <input
        type="text"
        className="form-control search-input"
        value={searchText}
        onChange={handleSearchChange}
        placeholder={searchOptions.placeholder}
      />
      {filterOptions && (
        <select
          className="form-control filter-select"
          value={filterValue}
          onChange={handleFilterChange}
        >
          <option value="">{filterOptions.allLabel}</option>
          {filterOptions.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </HeaderWrapper>
  )

  return (
    <CustomTableWrapper>
    <DataTable
      title={customHeader}
      columns={columns}
      data={filteredData}
      highlightOnHover
      pagination
      responsive
      selectableRows
      striped
      fixedHeader
      dense
      theme={theme}
    />
    </CustomTableWrapper>
  )
}

DataTableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  filterOptions: PropTypes.shape({
    field: PropTypes.string.isRequired,
    allLabel: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }),
  searchOptions: PropTypes.shape({
    field: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  }).isRequired,
}

export default DataTableComponent
