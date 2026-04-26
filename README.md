# Tracken: Financial Dashboard Platform

Tracken is a production-grade fintech application built with Angular, Nx, and Microfrontend architecture.

## 🚀 Features

- **Microfrontend Architecture**: Shell + Dashboard + Settings remotes using Module Federation.
- **State Management**: NgRx with Signal-based Facades for high-performance UI updates.
- **Internationalization (i18n)**: Full support for English and Portuguese with dynamic switching.
- **Backend**: Firebase (Authentication & Firestore).
- **Premium UI**: Modern, glassmorphism-inspired design with dark/light/midnight modes.
- **Error Handling**: Global error interceptors and user-friendly toast feedback.
- **Testing**: Robust suite with >90% coverage using Vitest.

## 🛠️ Tech Stack

- **Framework**: Angular 21+
- **Monorepo**: Nx
- **Package Manager**: pnpm
- **State**: NgRx
- **Styles**: SCSS
- **Backend**: Firebase

## 🏁 Getting Started

### 1. Prerequisites

- Node.js (Latest LTS)
- pnpm installed (`npm install -g pnpm`)

### 2. Setup

```bash
# Install dependencies
pnpm install

# Setup environment variables
# 1. Create a .env file in the root based on .env.example
# 2. Add your Firebase credentials
# 3. The environment.ts files will be automatically generated on pnpm start
```

### 🔒 Security Note

The project uses a dynamic environment generation system.

- `environment.ts` files are **ignored** by Git.
- `environment.ts.template` files act as a skeleton for the repository.
- **Never** commit real keys to the template files.

### 3. Running the App

```bash
# Serve the Shell (this will also serve the remotes)
pnpm exec nx serve shell
```

The app will be available at `http://localhost:4200`.

## 📂 Project Structure

- `shell/`: Host application managing routing and auth.
- `dashboard/`: Microfrontend remote for financial overview.
- `libs/shared/`: Shared design system and UI components.
- `libs/data-access/`: NgRx state management and Firebase services.

## 🧪 Testing

The platform maintains a high quality bar with over **90% unit test coverage**.

```bash
# Run all tests with coverage report
pnpm run test:coverage

# Run specific project tests
pnpm exec nx test shared
pnpm exec nx test settings
```
