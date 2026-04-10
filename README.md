# DataPulse

DataPulse is a full-stack app with:

- React + Vite frontend
- Node.js + Express backend
- MongoDB Atlas database
- WebSocket live search

## Production architecture

- Frontend: Vercel
- Backend: Vercel 
- Database: MongoDB Atlas



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

## Deploy backend on  vercel

1. Push this repository to GitHub.
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



## Expected final URLs
<img width="1913" height="968" alt="Screenshot 2026-04-10 072613" src="https://github.com/user-attachments/assets/fd85bfc2-736d-4fec-834b-669ef8481908" />
Replace these placeholders with your real deployed URLs:
- Backend URL : `https://data-pulse-backend.vercel.app/`
- Frontend URL: `https://your-frontend-app.vercel.app`

## Notes

- The backend now serves WebSocket connections on the same host and port as the HTTP API using `/ws`.
- 
- Vercel is a good fit for the frontend, but not for a persistent Node WebSocket server.

## Authentication  Or Autherization 
 - additional feature add this project :
 - Register Pages : 
 - <img width="1474" height="829" alt="Screenshot 2026-04-10 070700" src="https://github.com/user-attachments/assets/1200c2a8-d921-401c-820b-afce4f1c7dac" />


 - Login page : 
 - <img width="1842" height="918" alt="Screenshot 2026-04-10 070637" src="https://github.com/user-attachments/assets/b3a498ce-3cb7-47c9-8754-2796f541917f" />


  - Home :
  - this home page  :
  -

  
  -
  - <img width="1905" height="925" alt="Screenshot 2026-04-10 070442" src="https://github.com/user-attachments/assets/2a08f687-1da0-4707-b272-27a0f5d3df51" />





  

   - <img width="1770" height="1019" alt="Screenshot 2026-04-10 070537" src="https://github.com/user-attachments/assets/402259ac-9556-4a1b-8b7c-8a901448d2e9" />


 
