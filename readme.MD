# Relux Backend Service

A robust TypeScript-based backend service built with Express.js and MySQL, featuring authentication, role-based authorization, and various business modules.

## Features

- 🔐 JWT-based Authentication
- 👥 Role-Based Access Control (RBAC)
- 📚 Modular Architecture
- 🎯 Type Safety with TypeScript
- 🗄️ MySQL Database Integration
- 🔄 Repository Pattern Implementation
- ✨ Clean Architecture Principles

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd relux
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
DB_NAME=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET_KEY=your_secret_key
```

## Development

Start the development server:

```bash
npm run start
```

The server will be running at http://localhost:3000

## Technologies

- Express.js
- Sequelize ORM
- MySQL
- JSON Web Tokens (JWT)
- Zod (Schema Validation)
