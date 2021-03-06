# -*- coding: utf-8 -*-
"""drowsiness-detection

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/17_OE2zn31R8xjnO56KBBzWU8cfdOIdDy
"""

from google.colab import drive
drive.mount('/content/drive')

# import the necessary packages
import numpy as np
import argparse
import imutils
import time
import dlib
import cv2
from scipy.spatial import distance as dist
from imutils.video import VideoStream
from imutils import face_utils
from threading import Thread

image = cv2.imread("/content/drive/My Drive/hackMIT/eyepic.jpg")

resize = imutils.resize(image, width=450)

def eye_aspect_ratio(eye):
	# compute the euclidean distances between the two sets of vertical eye landmarks (
	A = dist.euclidean(eye[1], eye[5])
	B = dist.euclidean(eye[2], eye[4])
	# compute the euclidean distance between the horizontal eye landmark 
	C = dist.euclidean(eye[0], eye[3])
	# compute/return eye aspect ratio
	ear = (A + B) / (2.0 * C)
	return ear

EYE_AREA_THRESH = 0.3
#EAR_CONSEC_FRAMES= 50

print("[INFO] loading facial landmark predictor...")
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('drive/My Drive/hackMIT/shape_predictor_68_face_landmarks.dat')
print("loaded")

# grab the indexes of the facial landmarks for the left and
# right eye, respectively
(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]

gray = cv2.cvtColor(resize, cv2.COLOR_BGR2GRAY)
rects = detector(gray, 0)

# loop over the face detections
	for rect in rects:
		shape = predictor(gray, rect)
		shape = face_utils.shape_to_np(shape)
		# extract the left and right eye coordinates, to get ear
		leftEye = shape[lStart:lEnd]
		rightEye = shape[rStart:rEnd]
		leftEAR = eye_aspect_ratio(leftEye)
		rightEAR = eye_aspect_ratio(rightEye)
		# average the ear for both eyes
		ear = (leftEAR + rightEAR) / 2.0

# compute the convex hull for the left and right eye, then
    # visualize each of the eyes
    #leftEyeHull = cv2.convexHull(leftEye)
    #rightEyeHull = cv2.convexHull(rightEye)
    #cv2.drawContours(image, [leftEyeHull], -1, (0, 255, 0), 1)
    #cv2.drawContours(image, [rightEyeHull], -1, (0, 255, 0), 1)