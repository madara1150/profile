# 🚀 Project Name

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-1.70%2B-orange?style=for-the-badge&logo=rust&logoColor=white)
![Actix Web](https://img.shields.io/badge/Actix%20Web-4.0-green?style=for-the-badge&logo=rust&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A high-performance full-stack web application combining the speed of Rust with the interactivity of Next.js.**

[Getting Started](#-getting-started) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📖 About

This project demonstrates a modern full-stack architecture. The frontend is built with **Next.js (App Router)** for server-side rendering and static generation, styled with **Tailwind CSS** and **Shadcn UI**. The backend is powered by **Rust** using **Actix Web**, ensuring type safety, memory safety, and blazing fast performance.

## ✨ Features

- **⚡ Blazing Fast Backend**: Written in Rust using Actix Web for maximum throughput.
- **🎨 Modern Frontend**: Next.js 15 with React 19 for a smooth, responsive user interface.
- **🔐 Robust Authentication**: Secure login and registration flows (JWT-based).
- **🛡️ Type Safety**: Full TypeScript support on the frontend and strong static typing on the backend.
- **💅 Beautiful UI**: Crafted with Tailwind CSS v4 and Shadcn components.

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **Library**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Framework**: [Actix Web](https://actix.rs/)
- **Language**: [Rust](https://www.rust-lang.org/)
- **Serialization**: Serde
- **Logging**: Env Logger

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Rust & Cargo](https://www.rust-lang.org/tools/install)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/project.git
cd project
```

### 2. Backend Setup (Rust)

Navigate to the backend directory and start the server:

```bash
cd backend
# Build and run the server
cargo run
```

The server will start at `http://127.0.0.1:8080`.

### 3. Frontend Setup (Next.js)

Open a new terminal, navigate to the project root (or `app` folder if separated), and start the frontend:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
.
├── app/                  # Next.js App Router pages
├── components/           # React components (Shadcn, etc.)
├── lib/                  # Utility functions
├── public/               # Static assets
└── backend/              # Rust backend application
    ├── src/
    │   ├── main.rs       # Entry point
    │   ├── auth.rs       # Authentication logic
    │   ├── handlers.rs   # API Handlers
    │   └── models.rs     # Data models
    └── Cargo.toml        # Rust dependencies
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
