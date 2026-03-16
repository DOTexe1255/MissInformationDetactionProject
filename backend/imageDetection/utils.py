import cv2
import torch
from torchvision import transforms

# device select
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# image transform
transform = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((224,224)),
    transforms.ToTensor()
])

def preprocess(image_path):

    # image read
    img = cv2.imread(image_path)

    if img is None:
        raise ValueError("Image not found or path incorrect")

    # BGR → RGB convert
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # apply transform
    img = transform(img)

    # batch dimension add
    img = img.unsqueeze(0)

    # device move
    img = img.to(device)

    return img