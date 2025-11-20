# Surplus Monorepo

This repository is organized into two workspaces:

- `mobile` – React Native client (0.73.6 / React 18.2)
- `server` – Express + TypeScript API (Node 20+)

## Getting Started

1. Ensure Node.js 20+ is installed.
2. From each project directory run `npm install`.

### Mobile

```bash
cd mobile
npm install
npm start          # Metro
npm run android    # Android app
npm run ios        # iOS app
npm test           # Jest
```

### Server

```bash
cd server
npm install
npm run dev        # Nodemon + ts-node
npm run build
npm start          # Runs dist build
npm test           # Jest + Supertest
```

See the `mobile` and `server` READMEs for additional details and the roadmap for optional integrations (Firebase, payments, analytics, AI services, etc.).

# surplus
