from locust import HttpUser, task, between
import json

class SignLanguageTranslatorUser(HttpUser):
    wait_time = between(1, 5)

    def on_start(self):
        # This is called when a user starts
        pass

    @task(3)
    def check_health(self):
        self.client.get("/api/health/")

    @task(1)
    def simulate_auth_and_history(self):
        # Register a temporary user
        import random, string
        rand_str = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        email = f"loadtest_{rand_str}@example.com"
        password = "password123"
        
        register_resp = self.client.post("/api/auth/register", json={
            "email": email,
            "password": password
        })
        
        if register_resp.status_code == 201:
            login_resp = self.client.post("/api/auth/login", json={
                "email": email,
                "password": password
            })
            
            if login_resp.status_code == 200:
                token = login_resp.json().get("access_token")
                headers = {"Authorization": f"Bearer {token}"}
                
                # Create some history
                self.client.post("/api/history/", json={
                    "full_transcript": "HELLO FROM LOCUST"
                }, headers=headers)
                
                # Fetch history
                self.client.get("/api/history/", headers=headers)
