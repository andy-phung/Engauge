#from skimage.transform import resize
import cv2
import numpy as np
import math
import os
import tensorflow as tf
import pandas as pd
from tensorflow.keras import datasets, layers, models
import statistics
import dropbox

# function for inference after loading the model
def predict(frame): # frame should be a numpy array in the shape (240, 320, 3)
  prediction = model.predict(np.array([frame,]))
  prediction = prediction * 3
  engagement_score = prediction[0][1] - prediction[0][0]
  stress_score = prediction[0][2] + prediction[0][3] 
  #print("Engagement: " + str(engagement_score))
  #print("Stress: " + str(stress_score))
  return engagement_score, stress_score

def get_subjects(video_path, frame_rate):
  cap = cv2.VideoCapture(video_path)
  frame_list = []
  frameRate = cap.get(frame_rate) #frame rate (adjust as needed)
  while(cap.isOpened()):
      frameId = cap.get(1) #current frame number
      ret, frame = cap.read()
      if (ret != True):
          break
      if (frameId % math.floor(frameRate) == 0):
          frame_list.append(frame)
    
  cap.release()
  return frame_list


def divide_four(frame_list): 
  tl = []
  tr = []
  bl = []
  br = []
  for frame in frame_list:
    height, width = frame.shape[0], frame.shape[1]
    top_left = frame[0:int(-height/2), 0:int(width/2)]
    top_right = frame[0:int(-height/2), int(width/2):width]
    bottom_left = frame[int(-height/2):height, 0:int(width/2)]
    bottom_right = frame[int(-height/2):height, int(width/2):width]
    tl.append(top_left)
    tr.append(top_right)
    bl.append(bottom_left)
    br.append(bottom_right)
  return [tl, tr, bl, br] 
"""
def resize(frame):
  return resize(frame, (240, 320)) # flip around if it doesn't work
"""
def resize(frame):
  return cv2.resize(frame, (320, 240))

model = keras.models.load_model("model (1).h5")

# this is inference with the cnn (i.e. on only some frames from the recording)
dbx = dropbox.Dropbox('sl.AiCrAl-PDIr4MU5lYJrmkVaWGBn1YLqh2oaqGL27cVcXOtfFZxr5aTeY5j8AWJOLE5K0CeNGzLmbgWmAk0wwNz7ZMT_4GT5w6_DU9KlcUV8q1WefpWnYr1rG6wRb7xSiGyXU5qu4')
dbx.users_get_current_account()
files = []
for entry in dbx.files_list_folder('').entries:
    files.append(entry.name)

PATH_TO_ZOOM_RECORDING = files[0] # idk where the zoom recording would be stored after being uploaded on the site

frame_list = get_subjects(PATH_TO_ZOOM_RECORDING, 5)
divided = divide_four(frame_list)
students = {
    "1" : divided[0],
    "2" : divided[1],
    "3" : divided[2],
    "4" : divided[3]
}

student_metrics = {
    "1" : [], # [engagement avg, stress avg, learning ability metric (sum)]
    "2" : [],
    "3" : [],
    "4" : []
}

for key, student in students.items():
  e_avg = []
  s_avg = []
  for frame in student:
    engagement, stress = predict(frame)
    print(engagement)
    print(stress)
    e_avg.append(engagement)
    s_avg.append(stress)
  assert len(e_avg) > 0
  assert len(s_avg) > 0
  student_metrics[key].append(statistics.mean(e_avg))
  student_metrics[key].append(statistics.mean(s_avg))


print(student_metrics["1"])

# adding the learning ability metric (sum of the three) to each student's list
for key, student in student_metrics.items():
  student.append(sum(student))
  
C = [student_metrics["1"], student_metrics["2"], student_metrics["3"], student_metrics["4"]]

class_performance = np.array([sum(x) for x in zip(*C)])/4.0 # don't run this cell multiple times
