# Go Gin Employees Training Enrollment System

> ❗⚠️ CATATAN PENTING: untuk akses dev environment, gunakan `127.0.0.1` bukan `localhost`

Go Backend: [https://github.com/yehezkiel1086/go-gin-employees-training-enrollment-system](https://github.com/yehezkiel1086/go-gin-employees-training-enrollment-system)

Sebuah aplikasi web *full-stack* sederhana untuk mengelola program pelatihan karyawan. Admin dapat membuat dan mengelola sesi pelatihan, sementara karyawan dapat menelusuri dan mendaftar untuk pelatihan.

## Fitur Utama

### Manajemen Pengguna

- Terdapat peran **Karyawan** dan **Admin** yang datanya disimpan di dalam database.
- Akses berbasis peran:
    - **Admin:** Dapat melakukan operasi CRUD (Create, Read, Update, Delete) pada data pelatihan dan melihat semua data pendaftaran.
    - **Karyawan:** Dapat melihat daftar pelatihan yang tersedia, mendaftar, dan membatalkan pendaftaran.

### Manajemen Pelatihan

- Operasi CRUD (Create, Read, Update, Delete) untuk data pelatihan.
- Setiap data pelatihan memiliki informasi seperti: judul, deskripsi, tanggal, dan instruktur.

### Pendaftaran

- Karyawan dapat mendaftar atau membatalkan pendaftaran pada sebuah pelatihan.
- Setiap pendaftaran akan menghubungkan data pengguna (karyawan) dengan sesi pelatihan yang dipilih.

### Autentikasi

- Proses registrasi dan login menggunakan **autentikasi JWT** yang ditangani oleh backend (Golang).
- Rute yang terproteksi hanya bisa diakses dengan menyertakan *bearer token*.
- Token disimpan di sisi frontend (Next.js) menggunakan *cookie* atau *localStorage*.

## Teknologi yang Digunakan

- **Backend:** Go (Gin Framework)
- **Database:** PostgreSQL
- **Caching:** Redis
- **Containerization:** Docker

## Cara Instalasi dan Menjalankan Proyek

Proyek ini dijalankan menggunakan Docker. Pastikan Anda sudah menginstal Docker dan Docker Compose di sistem Anda.

1.  **Clone repository ini:**
    ```bash
    git clone https://github.com/yehezkiel1086/nextjs-employees-training-enrollment-system
    cd nextjs-employees-training-enrollment-system
    ```

2.  **Buat file `.env`:**
    Salin file `.env.example` menjadi `.env` dan sesuaikan nilainya jika diperlukan.
    ```bash
    cp .env.example .env
    ```
    File `.env` Anda akan terlihat seperti ini:
    ```env
    APP_NAME=go-gin-employees-training-enrollment-system
    APP_ENV=development

    HTTP_HOST=127.0.0.1
    HTTP_PORT=8080
    HTTP_ALLOWED_ORIGINS=http://127.0.0.1:3000,http://localhost:3000
    ```

3.  **Install dan Jalankan**
    ```bash
    npm install
    npm run dev
    ```
