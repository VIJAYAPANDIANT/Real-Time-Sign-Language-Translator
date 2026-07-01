# Load Testing the Real-Time Sign Language Translator

To ensure the backend handles multiple concurrent translation streams and API requests reliably, we use [Locust](https://locust.io/) for load testing.

## Prerequisites

Ensure you have installed the backend dependencies or just Locust:

```bash
cd backend
pip install -r requirements.txt
# or just locust:
pip install locust
```

## Running the Tests

1. Start your backend server (e.g. `uvicorn app.main:app --host 0.0.0.0 --port 8000`).
2. Run Locust from the `backend` directory:
   ```bash
   cd backend
   locust -f locustfile.py
   ```
3. Open the Locust web interface in your browser: `http://localhost:8089`
4. Set the number of total users to simulate, the spawn rate, and the target host (e.g. `http://localhost:8000`).
5. Start swarming!

## Test Scenarios Covered

- **Health Checks (`/api/health/`)**: High-frequency pings to ensure basic liveness of the application under load.
- **Auth & History Workflow**: Simulates new users registering, logging in (generating JWT tokens), storing translation history (`POST /api/history/`), and fetching their history (`GET /api/history/`).

## Future Enhancements
- Simulate WebSocket connections using a custom Locust client (`locust-plugins` or similar) to test real-time video frame streaming and prediction bottlenecks.
