# Halaman Dashbord Untuk Penulis Berita

template from [CoreUI for React](https://coreui.io/react/docs/templates/installation/)

## Quick Start

## Installation

## Setup Firebase

- Buat project baru di [Firebase Console](https://console.firebase.google.com/).
- Tambahkan aplikasi web baru.
- Aktifkan `Firestore Database` dan `Authentication`.
- Unduh `google-services.json` dan simpan di direktori `backend` dan `dashboard`.
- Sesuaikan nilai `API_KEY`, `AUTH_DOMAIN`, dan lainnya pada file `.env` di masing-masing direktori dengan nilai yang sesuai dari Firebase project Anda.

### Clone Repository dari branch dashboard

```bash
  git clone -b dashboard https://github.com/alrescha79-cmd/project-internship-winnicode-fullstack.git dashboard
```

### Arahkan ke folder dashboard

```bash
  cd dashboard
```

### Install semua dependensi

```bash
  npm i
```

### Tambahkan `.env` di root folder dashboard

Sesuaikan dengan key dari `Firebase`

```env
VITE_API_KEY=**********
VITE_AUTH_DOMAIN==**********
VITE_PROJECT_ID==**********
VITE_STORAGE_BUCKET==**********
VITE_MESSAGING_SENDER_ID==**********
VITE_APP_ID==**********

VITE_API=http://localhost:3000 # ganti sesuai dengan url backend
```

### Jalankan dashboard

```bash
  npm start
```

Secara default, Server akan berjalan pada <http://localhost:5000>

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

## Authors

- [Anggun Caksono](https://www.github.com/alrescha79-cmd)

## Documentation

The documentation for the CoreUI Admin Template is hosted at our website [CoreUI for React](https://coreui.io/react/docs/templates/installation/)
