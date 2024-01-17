import torch
import torch.optim as optim
from model import CNNtoRNN
import torchvision.transforms as transforms
import os

transform = transforms.Compose(
    [
        transforms.Resize((299, 299)),
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
        ])
def load_checkpoint(checkpoint, model, optimizer):
    model.load_state_dict(checkpoint["state_dict"])
    optimizer.load_state_dict(checkpoint["optimizer"])
    step = checkpoint["step"]
    return step

vocab = torch.load('vocab.pth')
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = CNNtoRNN(256, 256, len(vocab), 1).to(device)
optimizer = optim.Adam(model.parameters(), lr=5e-4)
checkpoint = load_checkpoint(torch.load("checkpoint/model_checkpoint.pth.tar", map_location=device), model, optimizer)
model.eval()


test_image_path = os.path.join(os.path.dirname(__name__), 'test_images/img/new.jpg')
# final.py

def final(img):
    caption = model.caption_image(img.to(device), vocab)
    return " ".join(caption)


# if __name__ == "__main__":
#     print(final())