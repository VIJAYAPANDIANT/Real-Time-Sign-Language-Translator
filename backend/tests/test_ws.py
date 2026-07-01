import pytest
from fastapi.testclient import TestClient
from app.main import app
import json

# WebSocket testing usually uses TestClient rather than AsyncClient
client = TestClient(app)

def test_websocket_endpoint():
    with client.websocket_connect("/ws/translate") as websocket:
        # Send an invalid frame or no_hand frame (just a dummy payload)
        websocket.send_text(json.dumps({"frame": "dummy_base64_not_a_real_image"}))
        data = websocket.receive_json()
        
        # Since it's a dummy image, but we mocked extractor to return landmarks,
        # it will start buffering frames for the prediction window (size 10)
        assert data == {"type": "status", "state": "buffering"}

def test_websocket_prediction_sequence():
    with client.websocket_connect("/ws/translate") as websocket:
        # Send 10 frames to fill the buffer and trigger a prediction
        for i in range(10):
            websocket.send_text(json.dumps({"frame": f"dummy_frame_{i}"}))
            data = websocket.receive_json()
            if i < 9:
                assert data == {"type": "status", "state": "buffering"}
            else:
                # 10th frame triggers prediction
                assert data["type"] == "prediction"
                assert "text" in data
                assert "confidence" in data
