# 📚 Library API — RESTful Book Management

![CI/CD](https://github.com/miftahrijallul/Tugas1_Prak_PPL1/actions/workflows/ci-cs.yml/badge.svg)


## 1. Deskripsi Project

**Library API** adalah RESTful API untuk **Manajemen Buku Perpustakaan**. API ini memungkinkan pengguna untuk melakukan operasi CRUD (Create, Read, Update, Delete) terhadap data buku, termasuk fitur filter berdasarkan genre dan ketersediaan buku.

---

## 2. Dokumentasi API

### Endpoint List

| Method | Endpoint        | Deskripsi                          |
|--------|----------------|------------------------------------|
| GET    | `/books`        | Ambil semua buku (support query filter) |
| GET    | `/books/:id`    | Ambil detail satu buku             |
| POST   | `/books`        | Tambah buku baru                   |
| PUT    | `/books/:id`    | Update data buku                   |
| DELETE | `/books/:id`    | Hapus buku                         |
| GET    | `/health`       | Health check API                   |

> Query params untuk GET `/books`: `?genre=Technology` atau `?available=true`

---

### Format Response

#### ✅ Success Response

```json
{
  "status": "success",
  "message": "Book created successfully",
  "data": {
    "id": 4,
    "title": "Refactoring",
    "author": "Martin Fowler",
    "genre": "Technology",
    "year": 1999,
    "available": true
  }
}
```

#### ✅ Success Response (List)

```json
{
  "status": "success",
  "message": "Retrieved 3 book(s)",
  "data": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "genre": "Technology",
      "year": 2008,
      "available": true
    }
  ]
}
```

#### ❌ Error Response (404 Not Found)

```json
{
  "status": "error",
  "message": "Book with id 99 not found",
  "data": null
}
```

#### ❌ Error Response (400 Bad Request)

```json
{
  "status": "error",
  "message": "Fields title, author, genre, and year are required",
  "data": null
}
```

---

## 3. Panduan Instalasi (Docker)

### Langkah Menjalankan Aplikasi

```bash
# 1. Clone repository
git clone https://github.com/miftahrijallul/Tugas1_Prak_PPL1.git
cd Tugas1_Prak_PPL1

# 2. Build dan jalankan container
docker-compose up --build

# 3. Jalankan di background (detached)
docker-compose up --build -d

# 4. Hentikan container
docker-compose down
```

### Informasi Port

| Keterangan       | Port  |
|-----------------|-------|
| **Host Port**   | 8080  |
| **Container Port** | 3000 |

Akses API di: `http://localhost:8080`

Contoh: `http://localhost:8080/books`

---

## 4. Alur Kerja Git

### Branch yang Digunakan

| Branch              | Fungsi                                        |
|--------------------|-----------------------------------------------|
| `main`             | Branch produksi, kode yang sudah stabil       |
| `develop`          | Branch integrasi, penggabungan semua fitur    |
| `feature/nama-fitur` | Branch pengembangan fitur baru              |

### Alur Kerja

```
feature/add-book-filter → develop → main
```

### Bukti Penggunaan Conventional Commits

```bash
git commit -m "feat: add GET /books endpoint with genre filter"
git commit -m "feat: add POST /books endpoint for creating new book"
git commit -m "fix: correct 404 error message for missing book id"
git commit -m "chore: add Dockerfile and docker-compose configuration"
git commit -m "test: add unit tests for CRUD endpoints"
git commit -m "docs: add README with API documentation"
```

---

## 5. Status Automasi (GitHub Actions)

### Workflow yang Dibuat

File: `.github/workflows/ci-cs.yml`

| Job | Tipe | Fungsi |
|-----|------|--------|
| `unit-test` | **CI** (Continuous Integration) | Menjalankan unit testing otomatis dengan Jest + coverage report |
| `security-scan` | **CS** (Continuous Security) | Menjalankan `npm audit` dan Trivy untuk deteksi vulnerability |

### Trigger Workflow

Workflow berjalan otomatis saat:
- **Push** ke branch `main`, `develop`, atau `feature/**`
- **Pull Request** ke branch `main` atau `develop`

### Badge Status

```markdown
![CI/CD](https://github.com/miftahrijallul/Tugas1_Prak_PPL1/actions/workflows/ci-cs.yml/badge.svg)
```

---

## Struktur Project

```
library-api/
├── .github/
│   └── workflows/
│       └── ci-cs.yml          # GitHub Actions workflow
├── src/
│   ├── app.js                 # Express app & routes
│   └── server.js              # Entry point
├── tests/
│   └── books.test.js          # Unit tests
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```
