# Homely Meals Web

This repository contains the Homely Meals backend and a new Next.js frontend in the `client` directory.

## Frontend

The frontend is a new Next.js 16 app using TypeScript, Tailwind CSS, ESLint, and Prettier.

### Run development

From the repository root:

```bash
npm run dev
```

This starts the frontend in `client` on `http://localhost:3000`.

### Build frontend

```bash
npm run build:client
```

### Lint frontend

```bash
npm run lint:client
```

### Format frontend

```bash
cd client && npm run format
```

## Backend

The backend server is managed from the repository root. Use `npm run dev:server` to compile the backend and start `dist/server.js`.
