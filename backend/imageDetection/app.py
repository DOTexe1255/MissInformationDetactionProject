from fastapi import FastAPI, UploadFile
import shutil
import os
from predict import predict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


    