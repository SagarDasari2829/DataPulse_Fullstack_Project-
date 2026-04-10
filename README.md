# DataPulse

DataPulse is a full-stack app with:

- React + Vite frontend
- Node.js + Express backend
- MongoDB Atlas database
- WebSocket live search

## Production architecture

- Frontend: Vercel
- Backend: Render or Railway
- Database: MongoDB Atlas

The backend exposes:

- REST API over `https://<backend-domain>`
- WebSocket endpoint over `wss://<backend-domain>/ws`

## Project structure

- `frontend/` - React client
- `backend/` - Express API + WebSocket server

## Environment variables

### Backend

Create `backend/.env` from `backend/.env.example`.

```env
PORT=5000
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/datapulse
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1d
```

Production example:

```env
PORT=10000
CORS_ORIGIN=https://your-vercel-app.vercel.app
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/datapulse?retryWrites=true&w=majority
JWT_SECRET=use-a-long-random-secret
JWT_EXPIRES_IN=1d
```

### Frontend

Create `frontend/.env` from `frontend/.env.example`.

```env
VITE_API_BASE_URL=http://localhost:5000
```

Production example:

```env
VITE_API_BASE_URL=https://your-backend-service.onrender.com
```

Optional override:

```env
VITE_SOCKET_URL=wss://your-backend-service.onrender.com/ws
```

If `VITE_SOCKET_URL` is not set, the frontend automatically derives it from `VITE_API_BASE_URL`.

## Local development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Build and start commands

### Frontend

- Install command: `npm install`
- Build command: `npm run build`
- Preview command: `npm run preview`

### Backend

- Install command: `npm install`
- Start command: `npm start`
- Dev command: `npm run dev`

## Deploy backend on Render

1. Push this repository to GitHub.
2. Create a MongoDB Atlas cluster and copy the connection string.
3. In Render, create a new `Web Service`.
4. Connect the GitHub repository.
5. Set the Render root directory to `backend`.
6. Use these settings:

- Runtime: `Node`
- Build command: `npm install`
- Start command: `npm start`

7. Add environment variables in Render:

- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CORS_ORIGIN`
- `PORT`

8. Set `CORS_ORIGIN` to your Vercel frontend domain.
9. Deploy the service.
10. Confirm these endpoints work:

- `https://<backend-domain>/`
- `https://<backend-domain>/health`
- `wss://<backend-domain>/ws`

## Deploy backend on Railway

1. Push this repository to GitHub.
2. Create a MongoDB Atlas cluster and copy the connection string.
3. In Railway, create a new project from the GitHub repo.
4. Set the service root directory to `backend`.
5. Add environment variables:

- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CORS_ORIGIN`
- `PORT`

6. Railway will detect Node automatically.
7. Use:

- Build command: `npm install`
- Start command: `npm start`

8. Deploy and copy the generated backend URL.
9. Test:

- `https://<backend-domain>/health`
- `wss://<backend-domain>/ws`

## Deploy frontend on Vercel

1. Push this repository to GitHub.
2. In Vercel, import the repository.
3. Set the Vercel root directory to `frontend`.
4. Framework preset: `Vite`
5. Use these settings:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

6. Add environment variables:

- `VITE_API_BASE_URL=https://<backend-domain>`
- Optional: `VITE_SOCKET_URL=wss://<backend-domain>/ws`

7. Deploy the frontend.
8. After deploy, copy the frontend URL and update the backend `CORS_ORIGIN` to that exact domain if needed.
9. Redeploy the backend if you changed `CORS_ORIGIN`.

## Deployment checklist

1. Create MongoDB Atlas database.
2. Deploy backend to Render or Railway.
3. Copy backend URL.
4. Deploy frontend to Vercel with `VITE_API_BASE_URL` pointing to backend.
5. Set backend `CORS_ORIGIN` to the Vercel domain.
6. Verify API and WebSocket connectivity from the deployed frontend.

## Expected final URLs

Replace these placeholders with your real deployed URLs:

- Frontend URL: `https://your-frontend-app.vercel.app`
- Backend URL: `https://your-backend-service.onrender.com`
- WebSocket URL: `wss://your-backend-service.onrender.com/ws`

## Notes

- The backend now serves WebSocket connections on the same host and port as the HTTP API using `/ws`.
- This setup is production-friendly for Render and Railway, where apps normally expose a single public port.
- Vercel is a good fit for the frontend, but not for a persistent Node WebSocket server.
