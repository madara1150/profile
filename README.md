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

### 5. Running with Docker Compose (Recommended)
You can easily spin up the full stack (Next.js Frontend, Go API Backend, and the connected SQLite database) using Docker Compose.

```bash
docker-compose up -d --build
```

**Services included:**
- **Frontend**: Next.js App available on `http://localhost:3000`
- **Backend API**: Go Server available on `http://localhost:8080`
- **Database**: SQLite Database automatically mounted via Volume to `backend/project.db` ensuring data persistence.

### 6. Database Management (Prisma Studio)
This project uses **Prisma** as the ORM to interact with the SQLite backend database. To view, edit, or manage the data via a beautiful web UI, run:

```bash
npx prisma studio
```
Then open `http://localhost:5555`

### 7. Component Workshop (Storybook)
We use Storybook to develop, document, and test UI components in isolation (Dark Mode & Tailwind enabled).

**Run locally:**
```bash
npm run storybook
```
Open `http://localhost:6006`

**Run via Docker Compose:**
```bash
docker-compose up storybook -d
```
Open `http://localhost:6006`

---

## 📁 Repository Structure

```text
📦 frontend
 ┣ 📂 docker-compose.yml      # Orchestrates Frontend + Backend
 ┣ 📂 backend                 # Hidden Go Backend & SQLite DB
 ┣ 📂 prisma                  # Prisma ORM Schema & Client setup
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 api/graphql         # New GraphQL Yoga Endpoint
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
 ┃ ┗ 📂 graphql               # Custom GraphQL Schema & Resolvers
 ┗ 📜 package.json
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 

<div align="center">
  Made with 🩸 and ☕ by the Uchiha Clan Developer
</div>
