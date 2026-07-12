import requests
import json

BASE = "http://localhost:11434"

payload = {
    "model": "gemma4:4b",
    "prompt": "Explain this Python function:\n\ndef f(x): return [i for i in x if i%2==0]"
}

response = requests.post(f"{BASE}/api/generate", json=payload)
print(response.text)
