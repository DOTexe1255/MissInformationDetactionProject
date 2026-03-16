import torch
import torch.nn as nn
import timm


class DeepfakeModel(nn.Module):

    def __init__(self):
        super().__init__()

        self.base_model = timm.create_model(
            "efficientnetv2_s",
            pretrained=False,
            num_classes=0   # classifier remove
        )

        self.base_model.classifier = nn.Sequential(
            nn.Linear(1280, 512),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(512, 5)
        )

    def forward(self, x):
        return self.base_model(x)