
# Portal Berita Fullstack

> [!IMPORTANT]  
> Jangan langsung Clone dari branch utama.

> [!CAUTION]
> Jika Anda langsung clone dari branch utama maka folder akan kosong.

> [!TIP]
> Anda bisa melakukan clone satu-satu per branch, seperti dokumentasi [dibawah ini](#installation).

### Proyek akhir untuk Magang Mandiri di [Winnicode Garuda Teknologi](https://www.winnicode.com) pada departemen Web Developer

##

## Deskripsi

Proyek ini merupakan sebuah portal berita fullstack yang dibangun menggunakan teknologi terkini. Aplikasi ini memungkinkan pengguna untuk mengakses berita terbaru, serta menyediakan dashboard bagi admin untuk mengelola konten.

## Fitur Utama

- **Halaman Berita:** Menampilkan berita terbaru dan terpopuler.

- **Dashboard Admin:** Mengelola berita, Penulis, dan kategori.

- **Autentikasi:** Menggunakan Firebase Authentication untuk mengatur login dan registrasi Penulis baru.

- **Penyimpanan Data:** Menggunakan Firestore Database dan Cloud Storage untuk menyimpan data berita, Penulis, dan lainnya.

## Tech Stack

- **Frontend:** [Astro](https://astro.build/),
[React](https://react.dev/),
[TailwindCSS](https://tailwindcss.com/)

- **Dashboard:** [React](https://react.dev/),
[Core Ui](https://coreui.io/react/docs/getting-started/introduction/)

- **Backend:** [Node](https://nodejs.org/),
[Express](https://expressjs.com/),
[Firebase](https://firebase.google.com/)

## Prasyarat

- Node.js dan npm (atau yarn) telah terinstal
- Akun Firebase
- Postman (untuk testing API)

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

### Kembali ke folder utama

```bash
  cd ..
```

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

### Kembali ke folder utama

```bash
  cd ..
```

### Clone Repository dari branch frontend

```bash
  git clone -b frontend https://github.com/alrescha79-cmd/project-internship-winnicode-fullstack.git frontend
```

### Arahkan ke folder frontend

```bash
  cd frontend
```

### Install semua dependensi

```bash
  npm i
```

### Tambahkan `.env` di root folder frontend


```env
HOST=<url-backend>
LOCAL_HOST=http://localhost:3000
```

### Jalankan frontend

```bash
  npm start
```

Secara default, Server akan berjalan pada <http://localhost:4321>

## Struktur Direktori

``` 
portal-berita
├── backend
├── dashboard
└── frontend
```

## Postman Collection

Gunakan `postman collection `berikut untuk testing API pada `backend`

[Project Internship Portal Berita Winnicode.postman_collection.json](https://drive.google.com/file/d/1SXqXUH2vUllWS_WblsGCDuXjHIjtUS5A/view?usp=drive_link)

## Authors

- [Anggun Caksono](https://www.github.com/alrescha79-cmd)
