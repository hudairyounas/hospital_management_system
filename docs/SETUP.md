# Setup & Development Guide

## Prerequisites
- **Node.js**: `v18.18+` or `v20+` / `v24+` (Verified on Node.js `v24.22.0`)
- **Package Manager**: `npm` `v10+` or `v11+` (Verified on npm `11.19.1`)

## 1. Install Dependencies
From the repository root (`g:\my_practice\hospital_management_system`):
```bash
npm install
```

## 2. Run Development Server
```bash
npm run dev
```
This starts the Vite development server (default `http://localhost:5173`).

## 3. Run Automated Tests
```bash
npm test
```
Executes the Vitest + React Testing Library suite in `src/test/app.test.tsx`.

## 4. Build for Production
```bash
npm run build
```
Runs `tsc -b` to verify strict TypeScript compilation and `vite build` to output static production assets to `dist/`.

## 5. Preview Production Build
```bash
npm run preview
```
Serves the compiled `dist/` bundle locally.
