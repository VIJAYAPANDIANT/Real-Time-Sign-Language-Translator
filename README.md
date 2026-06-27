# Real-Time Sign Language Translator

A full-stack web application that allows users to perform ASL signs through their webcam and see real-time translated text.

## Architecture

- **Frontend**: React + TypeScript (Vite), TailwindCSS
- **Backend**: Python FastAPI
- **Real-time transport**: WebSocket (frontend streams webcam frames/landmarks, backend streams back predictions)
- **Computer vision**: MediaPipe Hands + Pose for landmark extraction
- **ML model**: sequence classifier (LSTM/Transformer) trained on landmark sequences
- **Database**: PostgreSQL
- **Containerization**: Docker + docker-compose

## Folder Structure

- `/frontend`: React app.
- `/backend`: FastAPI app.
- `/ml`: Training pipeline, model artifacts, notebooks.

## Running Locally

To run the full stack locally:

1. Ensure Docker and docker-compose are installed on your machine.
2. Clone this repository.
3. Run the following command in the root of the project:

```bash
docker-compose up --build
```

4. Once the containers are running:
   - Frontend is accessible at `http://localhost:5173`
   - Backend API is accessible at `http://localhost:8000/api/health`

## Environment Variables

Copy the `.env.example` files to `.env` in both `/frontend` and `/backend` and update the values as needed.
