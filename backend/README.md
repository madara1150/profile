# Uchiha Backend 🚀

Backend API server สำหรับโปรเจกต์ S-Rank E-Commerce พัฒนาด้วย **Go (Golang)** และ **Gin Framework** 

---

## 🛠️ เทคโนโลยีที่ใช้
- **Language:** [Go](https://golang.org/)
- **Framework:** [Gin Web Framework](https://gin-gonic.com/)
- **CORS:** `github.com/gin-contrib/cors`

## 🚀 การติดตั้งและรันโปรเจกต์

1. **ติดตั้ง Dependencies:**
   เข้าสู่โฟลเดอร์ `backend` และรันคำสั่งเพื่อดาวน์โหลดไลบรารีที่จำเป็น
   ```bash
   cd backend
   go mod tidy
   ```

2. **รันเซิร์ฟเวอร์:**
   ```bash
   go run main.go
   ```
   > เซิร์ฟเวอร์จะเปิดใช้งานที่: `http://localhost:8080`

---

## 📡 API Endpoints

### 🟢 1. Health Check
ตรวจสอบสถานะการทำงานของเซิร์ฟเวอร์
- **Method:** `GET`
- **Path:** `/`
- **Response:**
  ```json
  {
    "message": "Uchiha Backend Server is running!",
    "status": "success"
  }
  ```

### 🗂️ 2. Projects (ข้อมูลโปรเจกต์)

#### ดึงข้อมูลโปรเจกต์ทั้งหมด
- **Method:** `GET`
- **Path:** `/api/projects`
- **Response:** คืนค่ามาเป็น Array ของ JSON ออบเจกต์โปรเจกต์ทั้งหมด

#### ดึงข้อมูลโปรเจกต์ตาม ID
- **Method:** `GET`
- **Path:** `/api/projects/:id`
- **Response:** คืนค่า JSON ออบเจกต์ของโปรเจกต์ที่ระบุ

### 📤 3. Uploads (อัปโหลดไฟล์)

#### อัปโหลดรูปภาพ
ระบบจะบันทึกรูปภาพไว้ที่โฟลเดอร์ `./uploads/images`
- **Method:** `POST`
- **Path:** `/api/upload/image`
- **Body:** `form-data` => `key`: "file", `value`: ไฟล์รูปภาพ
- **Response:**
  ```json
  {
    "message": "Image uploaded successfully",
    "name": "filename.png",
    "url": "http://localhost:8080/uploads/images/filename.png"
  }
  ```

#### อัปโหลดไฟล์ทั่วไป (เอกสาร, PDF, ฯลฯ)
ระบบจะบันทึกรูปภาพไว้ที่โฟลเดอร์ `./uploads/files`
- **Method:** `POST`
- **Path:** `/api/upload/file`
- **Body:** `form-data` => `key`: "file", `value`: ไฟล์เอกสาร
- **Response:**
  ```json
  {
    "message": "File uploaded successfully",
    "name": "document.pdf",
    "url": "http://localhost:8080/uploads/files/document.pdf"
  }
  ```

---

## 📁 โครงสร้างไฟล์
- ระบบจะสร้างโฟลเดอร์สำหรับเก็บไฟล์ที่อัปโหลดโดยอัตโนมัติเมื่อรันเซิร์ฟเวอร์:
  - `uploads/images/` สำหรับเก็บรูปภาพ
  - `uploads/files/` สำหรับเก็บไฟล์เอกสารอื่นๆ
- สามารถเข้าถึงไฟล์ที่อัปโหลดผ่าน URL ได้โดยตรงผ่าน path `/uploads/...` ตัวอย่างเช่น `http://localhost:8080/uploads/images/example.png`

## 🔒 CORS (Cross-Origin Resource Sharing)
API นี้อนุญาตการเข้าถึงจาก Origin ต่อไปนี้ (ตั้งค่าไว้ใน `main.go`):
- `http://localhost:3000` (รองรับสำหรับการพัฒนา Next.js Frontend)
