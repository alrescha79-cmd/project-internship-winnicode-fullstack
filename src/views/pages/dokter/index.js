// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import DataTableComponent from '../../../../src/components/DataTable'
// import { collection, getDocs } from 'firebase/firestore'
// import { db } from '../../../../src/config/firestore'

// const columns = [
//   {
//     name: 'Foto Dokter',
//     cell: (row) => (
//       <img src={row.profile_picture} alt={row.nama} style={{ width: '50px', height: '50px' }} />
//     ),
//   },
//   {
//     name: 'Nama Dokter',
//     selector: (row) => row.nama,
//   },
//   {
//     // name: 'Spesialis',
//     selector: (row) => row.spesialis,
//   },
//   {
//     name: 'Action',
//     cell: (row) => (
//       <div>
//         <button className="btn btn-secondary text-white m-1">Cooming Soon</button>
//       </div>
//     ),
//   },
// ]

// const Dokter = () => {
//   const navigate = useNavigate()
//   const [data, setData] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       const dataCollection = await getDocs(collection(db, 'dokter'))
//       const fetchedData = dataCollection.docs.map((doc) => {
//         const docData = doc.data()
//         return {
//           ...docData,
//           id: doc.id,
//         }
//       })

//       setData(fetchedData)
//     }

//     fetchData()
//   }, [])

//   return (
//     <div>
//       <DataTableComponent
//         columns={columns}
//         data={data}
//         searchOptions={{ field: 'nama', placeholder: 'Cari Nama Dokter' }}
//       />
//     </div>
//   )
// }

// export default Dokter

import React from 'react'

const index = () => {
  return <div>index</div>
}

export default index
