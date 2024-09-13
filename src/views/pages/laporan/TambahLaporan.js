// import { CButton } from '@coreui/react'
// import axios from 'axios'
// import React, { useState, useEffect } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// import { doc, getDoc, updateDoc } from 'firebase/firestore'
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// import { v4 as uuidv4 } from 'uuid'
// import jsPDF from 'jspdf'
// import { db } from '../../../../src/config/firestore'
// import 'jspdf-autotable'

// const MySwal = withReactContent(Swal)

// const TambahLaporan = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [image, setImage] = useState(null)
//   const [result, setResult] = useState(null)
//   const [notes, setNotes] = useState('')
//   const [patientName, setPatientName] = useState('')
//   const [generatingPdf, setGeneratingPdf] = useState(false)

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       const docRef = doc(db, 'pasien', id)
//       const docSnap = await getDoc(docRef)
//       if (docSnap.exists()) {
//         const patientData = docSnap.data()
//         setPatientName(patientData.nama_pasien)
//       } else {
//         MySwal.fire({
//           title: 'Error',
//           text: 'Data pasien tidak ditemukan.',
//           icon: 'error',
//         })
//       }
//     }

//     fetchPatientData()
//   }, [id])

//   const handleBackClick = () => {
//     MySwal.fire({
//       title: 'Anda yakin ingin kembali?',
//       text: 'Perubahan yang Anda buat mungkin tidak akan disimpan.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Ya, kembali',
//       cancelButtonText: 'Tidak, tetap di sini',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate('/laporan')
//       }
//     })
//   }

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0])
//   }

//   const handleNotesChange = (e) => {
//     setNotes(e.target.value)
//   }

//   const handleGeneratePdf = async () => {
//     const docRef = doc(db, 'pasien', id)
//     const docSnap = await getDoc(docRef)

//     const docRefPredict = doc(db, 'predictions', id)
//     const docSnapPredict = await getDoc(docRefPredict)

//     if (docSnap.exists()) {
//       const patientData = docSnap.data()
//       const result = docSnapPredict.exists() ? docSnapPredict.data() : null

//       const doc = new jsPDF()
//       doc.setFont('helvetica', 'normal')
//       doc.setFontSize(18)
//       doc.text('MITRA RADIOLOGI', 105, 15, null, null, 'center')

//       doc.setFontSize(12)
//       doc.text('X-Ray | CT-Scan | MRI', 105, 22, null, null, 'center')

//       doc.setFontSize(10)
//       doc.text(
//         'Revolutionizing Radiology Services with Blockchain and AI, BANGKIT ACADEMY 2024 BATCH 1',
//         105,
//         27,
//         null,
//         null,
//         'center',
//       )

//       doc.line(10, 30, 200, 30)

//       // Add patient information
//       doc.setFontSize(12)
//       doc.text(`${patientData.nama_pasien}`, 20, 40)
//       doc.text(`${patientData.no_hp}`, 150, 40)

//       doc.setFontSize(10)
//       doc.text(`${patientData.usia}`, 20, 45)
//       doc.text(`${patientData.email}`, 150, 45)

//       doc.text(`${patientData.gender}`, 20, 50)
//       doc.text(`${patientData.alamat}`, 150, 50)

//       doc.text(`${patientData.tanggal_kunjungan}`, 20, 55)
//       doc.text(`${patientData.nomor_antrian}`, 150, 55)

//       // Add scan type
//       doc.setFontSize(12)
//       doc.text(`${patientData.jenis_periksa}`, 105, 65, null, null, 'center')

//       // Add scan image
//       doc.addImage(`${result.imageUrl}`, 'JPEG', 20, 70, 50, 50)
//       doc.setFontSize(14)
//       doc.text('Hasil Prediksi', 20, 130)
//       doc.setFontSize(12)
//       doc.text(`Result: ${result.result}`, 20, 140)
//       doc.text(`confidenceScore: ${result.confidenceScore}`, 20, 150)
//       doc.text(`explanation: ${result.explanation}`, 20, 160)
//       doc.text(`suggestion: ${result.suggestion}`, 20, 170)

//       doc.text('Pesan:', 20, 190)
//       doc.text(
//         '• Tetap jaga kesehatan dan jangan lupa untuk selalu menjaga pola hidup sehat.',
//         20,
//         195,
//       )
//       doc.text('• Semua Hasil di-Generate menggunakan AI', 20, 200)

//       // Add footer with radiologists' information
//       doc.text('Thanks for Reference', 20, 210)
//       doc.text('****End of Report****', 105, 210, null, null, 'center')
//       doc.text('Radiologic Technologists', 20, 245)
//       doc.text('Dr. Payal Shah', 90, 245)
//       doc.text('Dr. Vimal Shah', 160, 245)
//       doc.text('(MSC, PGDM)', 20, 250)
//       doc.text('(MD, Radiologist)', 90, 250)
//       doc.text('(MD, Radiologist)', 160, 250)

//       // Footer information
//       doc.text(`Generated on: ${result.createdAt}`, 105, 260, null, null, 'center')
//       doc.text('Page 1 of 1', 200, 260, null, null, 'right')

//       const pdfBlob = doc.output('blob')

//       // Automatically upload the generated PDF
//       handleUploadPdf(pdfBlob)
//     } else {
//       console.log('No such document!')
//       MySwal.fire({
//         title: 'Error',
//         text: 'Data pasien tidak ditemukan.',
//         icon: 'error',
//       })
//     }
//   }

//   const handleUploadPdf = async (pdfBlob) => {
//     MySwal.fire({
//       title: 'Mengunggah PDF...',
//       text: 'Tunggu sebentar...',
//       allowOutsideClick: false,
//       didOpen: () => {
//         MySwal.showLoading()
//       },
//     })

//     const docRef = doc(db, 'pasien', id)
//     const storage = getStorage()
//     const fileName = `result/${uuidv4()}.pdf`
//     const storageRef = ref(storage, fileName)

//     try {
//       await uploadBytes(storageRef, pdfBlob)
//       const fileUrl = await getDownloadURL(storageRef)

//       await updateDoc(docRef, { result: fileUrl, status_hasil: true, status: 'Selesai' })

//       MySwal.fire({
//         title: 'PDF berhasil diunggah',
//         text: 'Hasil prediksi telah berhasil diunggah ke server. Silakan cek di halaman Detail Pasien.',
//         icon: 'success',
//       })
//     } catch (error) {
//       MySwal.fire({
//         title: 'Error',
//         text: `Terjadi kesalahan saat mengunggah PDF: ${error.message}`,
//         icon: 'error',
//       })
//     }
//   }

//   const handleSubmit = async () => {
//     const formData = new FormData()
//     formData.append('image', image)
//     formData.append('notes', notes)

//     MySwal.fire({
//       title: 'Tunggu sebentar...',
//       text: 'AI sedang memproses hasil pemeriksaan',
//       allowOutsideClick: false,
//       didOpen: () => {
//         MySwal.showLoading()
//       },
//     })

//     try {
//       const response = await axios.post(
//         `https://expres-mira-ml-abwswzd4sa-et.a.run.app/predict/${id}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         },
//       )
//       setResult(response.data.data)

//       MySwal.fire({
//         title: 'Hasil Prediksi',
//         html: `
//           <p><strong>Explanation:</strong> ${response.data.data.explanation}</p>
//           <p><strong>Suggestion:</strong> ${response.data.data.suggestion}</p>
//           <p><strong>Confidence Score:</strong> ${response.data.data.confidenceScore}</p>
//           <p><strong>Result:</strong> ${response.data.data.result}</p>
//         `,
//         icon: 'success',
//         confirmButtonText: 'Generate and sync PDF',
//       }).then((result) => {
//         if (result.isConfirmed) {
//           handleGeneratePdf()
//         }
//       })
//     } catch (error) {
//       let errorMessage = 'Terjadi kesalahan saat mengirim laporan.'
//       if (error.response) {
//         errorMessage = `Error: ${error.response.data.message || errorMessage}`
//       } else if (error.request) {
//         errorMessage = 'Tidak ada respon dari server.'
//       } else {
//         errorMessage = `Error: ${error.message}`
//       }

//       MySwal.fire({
//         title: 'Error',
//         text: errorMessage,
//         icon: 'error',
//         showCancelButton: true,
//         cancelButtonText: 'Batal',
//         confirmButtonText: 'Ulangi Lagi',
//       }).then((result) => {
//         if (result.isConfirmed) {
//           handleSubmit()
//         }
//       })
//     }
//   }

//   return (
//     <div>
//       <h1>Tambah Laporan untuk Pasien: {patientName}</h1>
//       <div className="form-group gap-2 d-flex flex-column">
//         <label htmlFor="exampleFormControlTextarea1">Catatan</label>
//         <textarea
//           className="form-control"
//           id="exampleFormControlTextarea1"
//           rows="3"
//           value={notes}
//           onChange={handleNotesChange}
//         ></textarea>
//         <label htmlFor="formFile">Hasil Pemeriksaan</label>
//         <input className="form-control" type="file" id="formFile" onChange={handleImageChange} />
//         <CButton color="primary" onClick={handleSubmit}>
//           Submit
//         </CButton>
//         <CButton color="danger" onClick={handleBackClick}>
//           Kembali
//         </CButton>
//         <p>Need a sample examination result file?</p>
//         <Link
//           to={
//             'https://drive.google.com/drive/folders/1IkVUS4JhxhPd0PnVjwMf5cMRS2_Cg319?usp=sharing'
//           }
//         >
//           {' '}
//           Sample Photo of a Brain Tumor
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default TambahLaporan

import React from 'react'

const index = () => {
  return <div>index</div>
}

export default index
