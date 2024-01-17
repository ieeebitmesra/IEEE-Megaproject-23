import serial. tools.list_ports
import csv
from datetime import datetime


ports = serial. tools. list_ports. comports ()
serialInst = serial.Serial()

portList = []

for onePort in ports:
    portList.append (str(onePort))

serialInst.baudrate = 9600
serialInst.port = "COM4"
serialInst.open()


with open("bpm.csv", mode="a") as csvfile:
    fieldnames = ["Time", "BPM"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    while True:
        if serialInst.in_waiting:
            packet = serialInst.readline()
            now = datetime.now()
            current_time = now.strftime("%H:%M:%S")
            writer.writerow({"Time": current_time, "BPM": packet.decode('utf').rstrip('\n')})
