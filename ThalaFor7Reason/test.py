import torch
import cv2
import argparse
import torch.optim as optim
from model import CNNtoRNN
from caption_processing import get_loader
import torchvision.transforms as transforms
from PIL import Image

transform = transforms.Compose(
    [
        transforms.Resize((299, 299)),
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
        ])

def load_checkpoint(checkpoint, model, optimizer):
    print("=> Loading checkpoint")
    model.load_state_dict(checkpoint["state_dict"])
    optimizer.load_state_dict(checkpoint["optimizer"])
    step = checkpoint["step"]
    return step


test_loader, dataset = get_loader(
    transform=transform,
    num_workers=8,
)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
torch.save(dataset.vocab, 'vocab.pth')
model = CNNtoRNN(256, 256, len(dataset.vocab), 1).to(device)
optimizer = optim.Adam(model.parameters(), lr=3e-4)
checkpoint = load_checkpoint(torch.load("checkpoint/model_checkpoint.pth.tar", map_location=device), model, optimizer)
model.eval()

# hard-Coded Testing per Single image
# test_img1 = transform(Image.open("test_images/img/dog.jpg").convert("RGB")).unsqueeze(0)
# print("Example 1 CORRECT: a white dog is standing in the field")
# print("Example 1 OUTPUT: "+ " ".join(model.caption_image(test_img1.to(device),dataset.vocab)))


parser = argparse.ArgumentParser()
parser.add_argument("--image_path", type=str, default = "test_images/img/new.jpg")
parser.add_argument("--user_caption", type=str, default = "a white dog is standing in the field")
user_args = parser.parse_args()

test_img1 = transform(Image.open(user_args.image_path).convert("RGB")).unsqueeze(0)
print("Example 1 CORRECT: "+user_args.user_caption)
print("Example 1 OUTPUT: "+ " ".join(model.caption_image(test_img1.to(device),dataset.vocab)))

predicted_caption = " ".join(model.caption_image(test_img1.to(device),dataset.vocab))

print(user_args.image_path)
print(" ".join(model.caption_image(test_img1.to(device),dataset.vocab)))

path = user_args.image_path
image = cv2.imread(path)
window_name = 'Display Caption on  Image'
font = cv2.FONT_HERSHEY_SIMPLEX
org = (50, 50)
fontScale = 1
#color Code B, G, R
color = (0, 125, 200)
thickness = 2

image = cv2.putText(image, predicted_caption, org, font,fontScale, color, thickness, cv2.LINE_AA)
# cv2.imshow(window_name, image)

# Saving the new image
cv2.imwrite("test_result.jpg", image)

