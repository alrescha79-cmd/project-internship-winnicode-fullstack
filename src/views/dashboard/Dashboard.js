import React, { useEffect, useState } from 'react'
import useFirebaseAuthToken from '../../hook/useFirebaseAuthToken'
import { fetchData } from '../../api'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const token = useFirebaseAuthToken()

  useEffect(() => {
    const getData = async () => {
      if (token) {
        try {
          const response = await fetchData('http://localhost:3000/news', token)
          setData(response.data)
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    getData()
  }, [token])

  return (
    <>
      <h1>Dashboard</h1>
      <ul>
        {Array.isArray(data) ? (
          data.map((item) => <li key={item.id}>{item.category}</li>)
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </>
  )
}

export default Dashboard