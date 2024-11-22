
# API Backend

Proyek akhir untuk Magang Mandiri di [Winnicode Garuda Teknologi](https://www.winnicode.com/beranda) pada departemen Web Developer

## Tech Stack

**Backend:** [Node](https://nodejs.org/),
[Express](https://expressjs.com/),
[Firebase](https://firebase.google.com/)

## Installation

## Setup Firebase

- Buat project baru di [Firebase Console](https://console.firebase.google.com/).
- Tambahkan aplikasi web baru.
- Aktifkan `Firestore Database` dan `Authentication`.
- Unduh `google-services.json` dan simpan di direktori `backend` dan `dashboard`.
- Sesuaikan nilai `API_KEY`, `AUTH_DOMAIN`, dan lainnya pada file `.env` di masing-masing direktori dengan nilai yang sesuai dari Firebase project Anda.

## Installation

### Buat Folder baru **portal-berita**

```bash
  mkdir portal-berita
```

### Clone Repository dari branch backend

```bash
  git clone -b backend https://github.com/alrescha79-cmd/project-internship-winnicode-fullstack.git backend
```

### Arahkan ke folder backend

```bash
  cd backend
```

### Install semua dependensi

```bash
  npm i
```

### Tambahkan `.env` di root folder backend

Sesuaikan dengan key dari `Firebase`

```env
API_KEY=****************
AUTH_DOMAIN=****************
PROJECT_ID=****************
STORAGE_BUCKET=****************
MESSAGING_SENDER_ID=****************
APP_ID=****************
URL_LOGIN=****************

EMAIL=****************
EMAIL_PASSWORD=****************
```

Jangan lupa download `google-services.json` dari Firebase dan masukkan ke root folder `backend`

### Jalankan backend

```bash
  npm run dev
```

Secara default, Server akan berjalan pada <http://localhost:3000>

## Postman Collection

Gunakan `postman collection`berikut untuk testing API pada `backend`

[Project Internship Portal Berita Winnicode.postman_collection.json](https://drive.google.com/file/d/1SXqXUH2vUllWS_WblsGCDuXjHIjtUS5A/view?usp=drive_link)

## Authors

- [Anggun Caksono](https://www.github.com/alrescha79-cmd)
