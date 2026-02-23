<div align="center">
  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Project Banner" width="100%" style="border-radius: 15px; margin-bottom: 20px;" />

  # 🌙 Uchiha Clan Developer Portfolio
  **Awaken The Code**

  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  </p>

  <p>
    An ultra-premium, interactive developer portfolio built with the dark arts of Next.js, Framer Motion, and Tailwind CSS.
  </p>

  [Explore The Genjutsu](#explore) •
  [Mission Logs](#mission-logs) •
  [Installation](#installation)
</div>

---

## ✨ Features

This portfolio is not just a showcase; it's an experience. Designed with a dark, immersive theme inspired by the Sharingan, featuring:

- 🌀 **Interactive Genjutsu Animations**: Scroll-linked animations orchestrating background colors, scaling, and rotation using Framer Motion.
- 📂 **Detailed Mission Logs (Projects)**: A comprehensive grid of projects, featuring beautiful cards with glowing hover effects.
- 🔍 **Immersive Project Details**: Click into any project to view:
  - 📸 Horizontal, snap-scrolling image carousels.
  - 📍 Classified metadata (Location, Time, Reference Links).
  - 📥 Clickable, downloadable classified documents (PDFs, Source Code).
- 🧭 **Dynamic Navigation**: A sleek, floating frosted-glass navbar that tracks your current section or hash location smoothly.
- 📱 **Fully Responsive**: Flawless execution across desktop monitors and mobile devices.

---

## 📸 Mission Previews

| The Awakening (Hero) | Mission Select (Projects) |
| :---: | :---: |
| <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" alt="Hero Section" style="border-radius: 10px;" /> | <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600" alt="Projects Grid" style="border-radius: 10px;" /> |

---

## 🚀 Installation & Setup

To awaken the code on your local machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name/frontend
```

### 2. Install Dependencies
Ensure you have Node.js installed. Then, install the required packages:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Ignite the Engine
Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Enter the Illusion
Open [http://localhost:3000](http://localhost:3000) in your browser to witness the portfolio.

### 5. Running with Docker (Optional)
If you want to run the full stack (Next.js + Go Backend) via Docker locally, build the image first:
```bash
docker build -t uchiha-app:latest .
```

Then run the container. **Note on Volume Mounting**: Since the project uses SQLite, you need to mount the database file. The path syntax depends on your terminal:

**On Windows PowerShell:**
```powershell
docker run -p 3000:3000 -p 8080:8080 -v "${PWD}/backend/project.db:/app/backend/project.db" --name uchiha-instance uchiha-app:latest
```

**On Windows Command Prompt (CMD):**
```cmd
docker run -p 3000:3000 -p 8080:8080 -v "%cd%/backend/project.db:/app/backend/project.db" --name uchiha-instance uchiha-app:latest
```

**On Linux/Mac (Bash):**
```bash
docker run -p 3000:3000 -p 8080:8080 -v "$(pwd)/backend/project.db:/app/backend/project.db" --name uchiha-instance uchiha-app:latest
```

---

## 📁 Repository Structure

```text
📦 frontend
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 project
 ┃ ┃ ┃ ┗ 📂 [id]              # Dynamic route for project details
 ┃ ┃ ┃   ┗ 📜 page.tsx        # Carousel, Metadata, Downloads
 ┃ ┃ ┣ 📜 layout.tsx          # Root layout and theme wrapper
 ┃ ┃ ┣ 📜 page.tsx            # Main Hero & Projects Grid
 ┃ ┃ ┗ ...
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 ui                  # Reusable UI elements (Sharingan, etc.)
 ┃ ┃ ┣ 📜 navbar.tsx          # Floating dynamic navigation
 ┃ ┃ ┣ 📜 project-card.tsx    # Interactive project list item
 ┃ ┃ ┗ ...
 ┃ ┣ 📂 data
 ┃ ┃ ┗ 📜 projects.tsx        # Centralized project database (JSON-like)
 ┃ ┗ ...
 ┗ 📜 package.json
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 

<div align="center">
  Made with 🩸 and ☕ by the Uchiha Clan Developer
</div>
