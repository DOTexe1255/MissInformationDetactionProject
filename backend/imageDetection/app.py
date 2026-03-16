from fastapi import FastAPI, UploadFile
import shutil
import os
from predict import predict

app = FastAPI()

# ensure uploads folder exists
os.makedirs("uploads", exist_ok=True)

@app.post("/detect-image")
async def detect_image(file: UploadFile):

    path = "uploads/" + file.filename

    # save image
    with open(path,"wb") as buffer:
        shutil.copyfileobj(file.file,buffer)

    # run prediction
    prediction, confidence = predict(path)

    # delete image after prediction
    os.remove(path)

    return {
        "prediction": prediction,
        "confidence": f"{confidence}%"
    }


    