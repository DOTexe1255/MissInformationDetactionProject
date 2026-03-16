step 1 : python -m  venv myvenv
step 2 : ./myvenv/Scripts/activate
step 3 : pip install -r requirements.txt
step 4 : pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
step 5 : uvicorn app:app --host 0.0.0.0 --port 8000 --reload




2️⃣ GPU Install Script (Best Practice)
GPU install command
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121