import numpy as np
import tensorflow as tf
from PIL import Image

# load keras model
model = tf.keras.models.load_model("models/final_model.keras")

IMG_SIZE = 224

classes = ["Fake","Real"]

def preprocess(image_path):

    img = Image.open(image_path).convert("RGB")

    img = img.resize((IMG_SIZE, IMG_SIZE))

    img = np.array(img)

    img = img / 255.0

    img = np.expand_dims(img, axis=0)

    return img
def predict(image_path):

    img = preprocess(image_path)

    pred = model.predict(img)[0][0]

    print("Raw output:", pred)

    if pred > 0.5:
        prediction = "Real"
        confidence = pred
    else:
        prediction = "Fake"
        confidence = 1 - pred

    # smoothing (important)
    confidence = 0.5 + (confidence - 0.5) * 0.5

    confidence = round(float(confidence * 100), 2)

    return prediction, confidence