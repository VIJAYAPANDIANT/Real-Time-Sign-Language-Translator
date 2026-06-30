import urllib.request
import json

url = 'https://api.github.com/repos/VIJAYAPANDIANT/Real-Time-Sign-Language-Translator/actions/runs'
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())
    
latest_run = data['workflow_runs'][0]
jobs_url = latest_run['jobs_url']

with urllib.request.urlopen(jobs_url) as response:
    jobs_data = json.loads(response.read().decode())

for job in jobs_data['jobs']:
    if job['conclusion'] == 'failure':
        print(f"Job '{job['name']}' failed.")
        check_run_url = job['check_run_url']
        # Fetch annotations
        annotations_url = check_run_url + '/annotations'
        try:
            with urllib.request.urlopen(annotations_url) as a_res:
                annotations = json.loads(a_res.read().decode())
                for a in annotations:
                    print(f"Annotation: {a['message']}")
        except Exception as e:
            print(f"Could not fetch annotations: {e}")
