import cv2
import os

def extract_frames(video_path, output_dir):

    cap = cv2.VideoCapture(video_path)
    count = 0

    while True:

        ret, frame = cap.read()

        if not ret:
            break

        frame_path = os.path.join(output_dir, f"frame_{count}.jpg")

        cv2.imwrite(frame_path, frame)

        count += 1

    cap.release()