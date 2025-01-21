# 🚀 AT Monorepo – Full-Stack Boilerplate with Nx, Next.js, NestJS, NextAuth & Prisma

Welcome to **AT - Monorepo**, a **full-stack monorepo boilerplate** designed for **scalability, modularity, and efficiency**. Built with **Nx, Next.js, NestJS, NextAuth, Prisma**, and **Tailwind CSS**, this boilerplate provides a **secure, production-ready** foundation for web applications.

## 📌 Features

✅ **Nx Monorepo** – Efficient multi-app structure  
✅ **Next.js Frontend** – Server-side rendering & API routes  
✅ **NestJS Backend** – Modular and scalable REST API  
✅ **NextAuth Authentication** – Google & GitHub OAuth login  
✅ **JWT & OAuth Token Validation** – Secure API access  
✅ **Role-Based Access Control (RBAC)** – Permissions & security guards  
✅ **Prisma ORM** – Type-safe database management  
✅ **Tailwind CSS** – Modern, utility-first styling  
✅ **API & Frontend Communication** – Seamless integration between apps

## 🔐 **Authentication & Security**

- Uses NextAuth.js for OAuth authentication (Google & GitHub).
- Stores and validates JWT tokens with NestJS Guard.
- Implements Role-Based Access Control (RBAC) for protected routes.

## 🔐 **📂 Project Structure**

```
monorepo-nx/
│── apps/
│   ├── next-app/          # Frontend (Next.js)
│   ├── nest-api/          # Backend (NestJS)
│── libs/
│   ├── security-guards/   # Auth Guards for Role-Based Access
│   ├── prisma/            # Database Schema & Migrations
│── .env                   # Environment variables
│── nx.json                # Nx monorepo configuration
│── package.json
│── README.md
```

---

## 🛠️ Setup & Installation

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/your-repo/monorepo-nx.git
cd at-monorepo
```

### 2️⃣**Install Dependencies**

```
npm install
```

### 3️⃣ **Set Up Environment Variables**

Create a .env file in the root directory and add:

```# NextAuth configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
NEXTAUTH_SECRET=your-nextauth-secret

# Database (Prisma)
DATABASE_URL=your-database-url

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:4200
```

### 4️⃣ \*\*Run Database Migrations (Prisma)

```
npx prisma migrate dev
```

### 5️⃣ **Run the Application**

```
# Run the application
npm run dev
```

## 📡 **API Routes (NestJS)**

### 🔓 **Public Routes**

```
GET /api/public
```

Returns a sample public response.

### 🔓 **Public Routes**

```
GET /api/private
Headers: {
    Authorization: "Bearer <token>"
    "X-Provider": "Your provider"
    }
```

Requires authentication via JWT.

## 🚀 **Deployment**

To build the application for production:

```
npm run build
```

Deploy frontend and backend using Docker, Vercel, or your preferred cloud provider.

## 📝 **Contributing**

1 - Fork the repository
2 - Create a new branch: git checkout -b feature-branch
3 - Make your changes
4 - Commit changes: git commit -m "Added new feature"
5 - Push changes: git push origin feature-branch
6 - Submit a pull request 🚀

## 📄 **License**

This project is licensed under the MIT License.
