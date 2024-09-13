import React, { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const showSuccessAlert = (message) => {
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
  })
}

export const showErrorAlert = (message) => {
  Swal.fire({
    position: 'top-center',
    icon: 'error',
    title: 'Oops...',
    text: message,
    footer: '<a href="#">Why do I have this issue?</a>',
  })
}

export const showConfirmAlert = async (title, text) => {
  const { isConfirmed } = await MySwal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak',
  })

  return isConfirmed
}
