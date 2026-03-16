import torch
from torch.utils.data import DataLoader
from src.dataset_loader import DeepfakeDataset
from src.model import get_model

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

dataset = DeepfakeDataset("frames_dataset")

loader = DataLoader(dataset, batch_size=16, shuffle=True)

model = get_model().to(device)

criterion = torch.nn.CrossEntropyLoss()

optimizer = torch.optim.Adam(model.parameters(), lr=0.0001)

for epoch in range(10):

    for images, labels in loader:

        images = images.to(device)
        labels = labels.to(device)

        outputs = model(images)

        loss = criterion(outputs, labels)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    print("epoch done")

torch.save(model.state_dict(), "models/deepfake_model.pth")