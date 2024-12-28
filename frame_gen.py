import cv2 as cv
import numpy as np
from PIL import Image
import json
import os

video = cv.VideoCapture(r"BadApple!!/video.mp4")
json_path = r"./Extension/assets/animation/frame.json"
frame_counter = 0

if __name__ == "__main__":
    with open(json_path, "r") as file:
        json_frame = json.load(file)
    json_frame = {"number":0,"frames":[]}
    while True:
        ret, frame = video.read()
        if not ret:
            break
        img = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
        img = Image.fromarray(img)
        img = img.resize((53,35),Image.Resampling.LANCZOS)
        img = img.convert("L")
        img_array = np.array(img)
        rows, cols = img_array.shape
        for x in range(rows):
            for y in range(cols):
                val = img_array[x][y]
                if val >= 188 :
                    img_array[x][y] = 0
                elif val in range(158,188):
                    img_array[x][y] = 1 
                elif val in range(80,158):
                    img_array[x][y] = 2
                elif val in range(30,80):
                    img_array[x][y] = 3
                else:
                    img_array[x][y] = 4
                
        json_frame["frames"].append(img_array.tolist())
        frame_counter += 1
    print(frame_counter)
    json_frame["number"] = frame_counter
    with open(json_path, "w") as file:
        json.dump(json_frame, file, separators=(",", ":"))