# Surplus Server

Express 4 + TypeScript starter that targets Node 20+. Only baseline dependencies are installed so you can incrementally add the heavier AI, media, and payment SDKs from the specification.

## Commands

```bash
npm install
npm run dev         # Nodemon + ts-node
npm run build       # TypeScript -> dist
npm start           # Run compiled build
npm run start:prod  # Production mode
npm test            # Jest + Supertest
```

## Structure

- `src/config/` – Environment + database helpers
- `src/routes/` – Centralized router (health check included)
- `src/controllers/` – Example controller
- `src/middlewares/` – Error handling
- `tests/` – Jest config

## Environment

Create `.env.staging` and `.env.production` in the project root.

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/surplus
JWT_SECRET=replace-me
```

## Roadmap

- Add authentication (JWT issuance, Google/Apple verification).
- Wire AI providers (OpenAI, Google Generative AI, etc.).
- Integrate messaging, analytics, and payment SDKs.
- Expand testing (Mocha + NYC) as features arrive.

