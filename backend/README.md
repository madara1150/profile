# Uchiha Backend 🚀

Backend API server สำหรับโปรเจกต์ S-Rank E-Commerce พัฒนาด้วย **Go (Golang)** และ **Gin Framework** 

---

## 🛠️ เทคโนโลยีที่ใช้
- **Language:** [Go](https://golang.org/)
- **Framework:** [Gin Web Framework](https://gin-gonic.com/)
- **Database:** SQLite (via `github.com/glebarez/sqlite` Pure Go / No CGO required) + GORM
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

---

## 🐳 การใช้งานผ่าน Docker (Production)

โปรเจกต์นี้มาพร้อมกับไฟล์ `Dockerfile` แบบ Multi-stage ที่รวมเอาทั้ง **Go Backend** และ **Next.js Frontend** เข้าไว้ด้วยกันใน Container เดียว เพื่อความง่ายในการ Deploy จริง

### วิธีสร้าง Docker Image (Build)
ให้รันคำสั่งต่อไปนี้ที่โฟลเดอร์หลักสุดของโปรเจกต์ (โฟลเดอร์นอกสุดที่คลุมทั้ง `src` และ `backend`)

```bash
docker build -t uchiha-app .
```

### วิธีรัน Docker Container (Run)
เปิดใช้งานทั้ง 2 เซิร์ฟเวอร์พร้อมกันผ่านพอร์ต `3000` (หน้าเว็บ) และ `8080` (API) ได้เลย:

```bash
docker run -p 3000:3000 -p 8080:8080 -v $(pwd)/project.db:/app/backend/project.db --name uchiha-instance uchiha-app
```
> **หมายเหตุ:** แนะนำให้ mount volume ไฟล์รูปภาพและไฟล์ Database เช่น `project.db` ออกมาด้านนอก เพื่อไม่ให้ข้อมูลหายตอนลบ Container ครับ

---

## ⚙️ CI/CD Automation ผ่าน Jenkins

หากมีการอัปเดตโค้ดใน Branch `main` บน GitHub ก็สามารถตั้งค่าให้ **Jenkins** ดึงโค้ดมารันสร้างเซิร์ฟเวอร์ใหม่ได้อัตโนมัติ โดยใช้ไฟล์ `Jenkinsfile` ที่แถมมาให้ในโปรเจกต์นี้!

### ขั้นตอนการตั้งค่าใน Jenkins:
1. ไปที่ Jenkins Dashboard > สร้าง **New Item** เลือกเป็น **Pipeline**
2. ในส่วนของ **Build Triggers** ให้ติ๊กเลือก `GitHub hook trigger for GITScm polling`
3. เลื่อนลงมาที่ส่วน **Pipeline** 
   - เปลี่ยน Definition เป็น `Pipeline script from SCM`
   - เลือก SCM เป็น `Git` ใส่ Repository URL ของโปรเจกต์นี้
   -ระบุ Branch Specifier เป็น `*/main`
   - ช่อง Script Path ใส่ `Jenkinsfile`
4. ตั้งค่า **Webhook** ใน GitHub โดยไปที่ Repository > **Settings > Webhooks**
   - Payload URL: `http://<IP-Jenkins>:8080/github-webhook/`
   - Content type: `application/json`
   - เลือก trigger ตอน `Just the push event`

เพียงเท่านี้เมื่อมีคน *Push/Merge โค้ดเข้าสู่ Branch main* ตัว Jenkins ก็จะรับคำสั่งและดึงโค้ดไปรัน Build Docker และสลับเซิร์ฟเวอร์ใหม่ให้อัตโนมัติทันที 🚀
