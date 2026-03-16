import torch
import cv2
from torchvision import transforms
from PIL import Image
import torch.nn.functional as F
from src.model import DeepfakeModel

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = DeepfakeModel()
model.load_state_dict(torch.load("models/deepfake_model.pth", map_location=device))

model.to(device)
model.eval()

transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor()
])

classes = [
    "REAL",
    "DeepFake",
    "FaceSwap",
    "Face2Face",
    "NeuralTextures"
]


def predict_frame(frame):

    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image = Image.fromarray(image)

    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(image)

        probs = F.softmax(outputs, dim=1)

        confidence, pred = torch.max(probs, 1)

    label = classes[pred.item()]
    confidence = float(confidence.item() * 100)

    return label, round(confidence, 2)