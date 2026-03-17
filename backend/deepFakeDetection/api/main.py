import os
import shutil
import time
import cv2
from fastapi import FastAPI, UploadFile
from src.inference import predict_frame
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_video(file: UploadFile):

    start_time = time.time()

    os.makedirs("temp", exist_ok=True)

    temp_path = f"temp/{file.filename}"

    # save uploaded video
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    cap = cv2.VideoCapture(temp_path)

    frame_count = 0
    predictions = []
    label = "Unknown"

    while True:
        ret, frame = cap.read()

        if not ret:
            break

        # every 2nd frame analyze
        if frame_count % 2 == 0:
            label, conf = predict_frame(frame)
            predictions.append(conf)

        frame_count += 1

        # limit frames (fast demo)
        if frame_count > 200:
            break

    cap.release()

    os.remove(temp_path)

    if len(predictions) == 0:
        return {"error": "No frames analyzed"}

    avg_conf = sum(predictions) / len(predictions)

    processing_time = round(time.time() - start_time, 2)

    return {
        "prediction": label,
        "confidence": f"{round(avg_conf,2)}%",
        "frames_analyzed": len(predictions),
        "processing_time": f"{processing_time} seconds"
    }