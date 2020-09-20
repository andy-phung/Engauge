#from skimage.transform import resize
import cv2
import numpy as np
import math
import os
import tensorflow as tf
from tensorflow import keras
import pandas as pd
from tensorflow.keras import datasets, layers, models
import statistics
import dropbox
import time
from oauth2client.service_account import ServiceAccountCredentials
import gspread 


scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('sheets_creds.json', scope)
client = gspread.authorize(creds)

sheet = client.open("Engauge").sheet1

# function for inference after loading the model
def predict(frame): # frame should be a numpy array in the shape (240, 320, 3)
  prediction = model.predict(np.array([frame,]))
  prediction = prediction * 3
  engagement_score = prediction[0][1] - prediction[0][0]
  stress_score = prediction[0][2] + prediction[0][3] 
  #print("Engagement: " + str(engagement_score))
  #print("Stress: " + str(stress_score))
  return engagement_score, stress_score

def get_subjects(cap, frame_rate):
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

def resize(frame):
  return cv2.resize(frame, (320, 240))

model = keras.models.load_model("model (1).h5")

# this is inference with the cnn (i.e. on only some frames from the recording)
while(True):
  if(str(sheet.cell(2, 7).value) == 'x'):
    sheet.update_cell(2, 7, "n")
    print("works")
    dbx = dropbox.Dropbox('uj19moYp_NIAAAAAAAAAAbSPRn10Ac9U5dBteiLLyvDyD5EryYnyIEAFOndwEZ31')
    dbx.users_get_current_account()
    files = []
    for entry in dbx.files_list_folder('').entries:
      files.append(entry.name)
    #print(entry)

    PATH = "/" + files[0]
    f = dbx.files_get_temporary_link(PATH)
    #print(f.link)
    cap = cv2.VideoCapture(str(f.link))


    frame_list = get_subjects(cap, 5)
    divided = divide_four(frame_list)
    print('checking shape')
    #print(divided[0][0])
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
        #print("works?")
        #print(engagement)
        #print(stress)
        e_avg.append(engagement)
        s_avg.append(stress)
      #print("checkpoint")
      #print(e_avg)
      #print(s_avg)
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

    for key, value in student_metrics.items():
      print(int(key))
      update_list = ["Student " + str(key), value[0], value[1], ".", value[2]]
      index = int(key) + 1
      sheet.insert_row(update_list, index)

    update_list = ["Class Average", class_performance[0], class_performance[1], ".", class_performance[2]]
    sheet.insert_row(update_list, 6)
    time.sleep(20)
  else:
    time.sleep(20)
    pass
