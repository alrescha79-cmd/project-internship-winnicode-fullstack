// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import DataTableComponent from '../../../../src/components/DataTable'
// import { collection, getDocs } from 'firebase/firestore'
// import { db } from '../../../../src/config/firestore'
// import BadgeStatus from '../../../../src/components/BadgeStatus'

// const columns = (navigate) => [
//   {
//     name: 'Nama Pasien',
//     selector: (row) => row.nama_pasien,
//   },
//   {
//     name: 'Status',
//     cell: (row) => <BadgeStatus status={row.status} />,
//   },
//   {
//     name: 'Action',
//     cell: (row) => (
//       <div>
//         <button
//           className="btn btn-success text-white m-1"
//           onClick={() => navigate(`/tambah-laporan/${row.id}`)}
//         >
//           Tambah Laporan
//         </button>
//       </div>
//     ),
//   },
// ]

// const Laporan = () => {
//   const navigate = useNavigate()
//   const [data, setData] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       const dataCollection = await getDocs(collection(db, 'pasien'))
//       const fetchedData = dataCollection.docs.map((doc) => {
//         const docData = doc.data()
//         return {
//           ...docData,
//           id: doc.id,
//           status: docData.status || 'Menunggu Konfirmasi',
//         }
//       })

//       const confirmedData = fetchedData.filter((item) => item.status === 'Konfirmasi')
//       setData(confirmedData)
//     }

//     fetchData()
//   }, [])

//   const searchOptions = {
//     field: 'nama_pasien',
//     placeholder: 'Cari Nama Pasien',
//   }

//   return (
//     <div>
//       <DataTableComponent columns={columns(navigate)} data={data} searchOptions={searchOptions} />
//     </div>
//   )
// }

// export default Laporan

import React from 'react'

const index = () => {
  return <div>index</div>
}

export default index
