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

    preds = model.predict(img)

    # probability
    probs = preds[0]

    pred_index = np.argmax(probs)

    confidence = probs[pred_index] * 100

    prediction = classes[pred_index]

    return prediction, round(float(confidence),2)