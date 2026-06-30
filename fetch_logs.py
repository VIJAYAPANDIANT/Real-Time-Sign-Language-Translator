import urllib.request
import json
import zipfile
import io

url = 'https://api.github.com/repos/VIJAYAPANDIANT/Real-Time-Sign-Language-Translator/actions/runs'
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())
    
latest_run = data['workflow_runs'][0]
logs_url = latest_run['logs_url']

req = urllib.request.Request(logs_url)
try:
    with urllib.request.urlopen(req) as response:
        with zipfile.ZipFile(io.BytesIO(response.read())) as z:
            for filename in z.namelist():
                if "Build and push backend image" in filename:
                    print(f"--- LOGS FOR {filename} ---")
                    print(z.read(filename).decode('utf-8')[-2000:])
                    print("-" * 50)
except Exception as e:
    print(f"Error fetching logs: {e}")
