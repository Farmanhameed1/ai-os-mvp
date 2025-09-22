from fastapi import FastAPI, Query
from pydantic import BaseModel
import os
import subprocess
import json
from typing import List

app = FastAPI()

class GenReq(BaseModel):
    prompt: str

# Simple file search (home directory, limited depth)
@app.get('/search')
def search(query: str = Query(...)):
    home = os.path.expanduser('~')
    results = []
    # naive walk - production: use ripgrep or limit depth
    for root, dirs, files in os.walk(home):
        for f in files:
            if query.lower() in f.lower():
                path = os.path.join(root,f)
                preview = ''
                try:
                    with open(path,'r',encoding='utf-8') as fh:
                        preview = fh.read(500)
                except Exception:
                    preview = ''
                results.append({'path':path,'preview':preview})
        if len(results) > 50:
            break
    return {'results': results}

@app.post('/generate')
def generate(req: GenReq):
    prompt = req.prompt
    # For MVP: call an external local model CLI (gpt4all, llama.cpp, etc.)
    # Example: using `gpt4all` CLI if installed: `gpt4all --model <model> --prompt "..."`
    try:
        # Replace this with the actual CLI or python binding call
        # The following is placeholder that echoes the prompt back.
        text = f"[MVP local-model echo] You said: {prompt}"
        return {'text': text}
    except Exception as e:
        return {'text': f'Error: {str(e)}'}
