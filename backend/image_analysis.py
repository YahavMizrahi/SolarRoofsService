import cv2
import os

def check_img(img_index):
    img = cv2.imread('{}.png'.format(img_index), -1)

    if(img is None):
        return False
    else:
        return True

def analyze(img_index):

    img = cv2.imread('{}.png'.format(img_index), -1)
    edge = cv2.imread('{}.png'.format(img_index), -1)

    if(img is None or edge is None):
        return False
        
    max_cnt = 0
    cnt = None

    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))

    canny = cv2.Canny(img, 80, 220)
    canny = cv2.morphologyEx(canny, cv2.MORPH_DILATE, kernel)

    canny_edge = cv2.Canny(edge, 0, 40)
    canny_edge = cv2.morphologyEx(canny_edge, cv2.MORPH_DILATE, kernel)

    _, thresh = cv2.threshold(canny_edge, 200, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

    for contour in contours:
        approx = cv2.approxPolyDP(contour, 0.001 * cv2.arcLength(contour, True), True)

        if cv2.contourArea(approx, True) > max_cnt:
            max_cnt = cv2.contourArea(approx, True)
            cnt = approx
        if cv2.contourArea(approx, False) > max_cnt:
            max_cnt = cv2.contourArea(approx, False)
            cnt = approx

    _, thresh = cv2.threshold(canny, 200, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

    object_count = 0
    total_object_area = 0

    for contour in contours:
        approx = cv2.approxPolyDP(contour, 0.001 * cv2.arcLength(contour, True), True)

        if 100 > cv2.contourArea(approx, False) > 5:
            object_count += 1
            total_object_area += cv2.contourArea(approx, False)

        if 100 > cv2.contourArea(approx, True) > 5:
            object_count += 1
            total_object_area += cv2.contourArea(approx, True)

    return (max_cnt - total_object_area) / max_cnt * 100