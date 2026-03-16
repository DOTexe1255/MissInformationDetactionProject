from torch.utils.data import Dataset
import os
import cv2
from torchvision import transforms

transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Resize((224,224))
])

class DeepfakeDataset(Dataset):

    def __init__(self, folder):

        self.data = []
        self.labels = []

        real_path = os.path.join(folder,"real")
        fake_path = os.path.join(folder,"fake")

        for img in os.listdir(real_path):
            self.data.append(os.path.join(real_path,img))
            self.labels.append(0)

        for img in os.listdir(fake_path):
            self.data.append(os.path.join(fake_path,img))
            self.labels.append(1)

    def __len__(self):
        return len(self.data)

    def __getitem__(self,idx):

        img = cv2.imread(self.data[idx])
        img = transform(img)

        return img, self.labels[idx]