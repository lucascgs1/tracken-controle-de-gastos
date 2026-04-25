# Tracken: Financial Dashboard Platform

Tracken is a production-grade fintech application built with Angular, Nx, and Microfrontend architecture.

## 🚀 Features
- **Microfrontend Architecture**: Shell + Dashboard Remote using Module Federation.
- **State Management**: NgRx with Store, Effects, Entity, and Facade pattern.
- **Backend**: Firebase (Authentication & Firestore).
- **Premium UI**: Modern dark mode design using vanilla SCSS.
- **Reusability**: Shared UI library with premium components.
- **Seed System**: Automatic data seeding for new users and Demo Mode.

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
# Edit the .env file with your Firebase credentials
```

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
```bash
pnpm exec nx test shell
pnpm exec nx test shared
```
