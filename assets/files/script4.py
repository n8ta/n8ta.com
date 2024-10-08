import matplotlib.pyplot as plt
import matplotlib.dates as md
import datetime
import numpy
import scipy.fft
import scipy.signal.windows
from  scipy.fftpack import fftfreq
SAMPLING_PERIOD_IN_S = 30

path = "./log.txt"

f = open(path, 'r')

times = []
temps = [[],[]]
for line in f:
    try:
        epoch_time, t1, t2 = line.split(",")
        t2 = t2.strip("\n")
        temps[0].append(float(t1))
        temps[1].append(float(t2))
        time = int(epoch_time.split(".")[0])
        times.append(datetime.datetime.fromtimestamp(time))
    except Exception as e:
        print(e)
        print(line)


temps[1] = temps[1][len(temps[1])-200:]
temps[0] = temps[0][len(temps[0])-200:]

hn = scipy.signal.windows.hann(200)

times = md.date2num(times)
plt.subplot(2,2,1)
plt.plot(times[len(times)-200:], temps[1])
plt.xlabel('Time')
plt.ylabel('Temp deg F')
plt.title('Snake Temps ')
plt.ylim(60, 100)


plt.subplot(2,2,2)
mn = sum(temps[1])/len(temps[1])
plt.plot(times[len(times)-200:], [x-mn for x in temps[1]])
plt.xlabel('Time')
plt.ylabel('Temp deg F')
plt.title('Temps shifted by mean')

hn = scipy.signal.windows.hann(200)
mn = sum(temps[1])/len(temps[1])
hann_applied = [x * hn[i] for i,x in enumerate(temps[1])]
shifted = [(x-mn) * hn[i] for i,x in enumerate(temps[1])]

plt.subplot(2,2,3)
plt.plot(times[len(times)-200:], shifted, label='Temp')
plt.plot(times[len(times)-200:], hn, label='Hann')
plt.xlabel('Time')
plt.ylabel('Temp deg F')
plt.title('Temps shifted and hann applied ')
plt.legend()

plt.subplot(2,2,4)
plt.title('FFT ')


Y2 = scipy.fft.fft(shifted)
freq2 = fftfreq(200, SAMPLING_PERIOD_IN_S)
freq2 = [(1/f) / 60 for f in freq2 ]
Y2 = [abs(y) for y in Y2]



plt.plot(freq2, Y2,)
plt.xlabel('Period in Minutes')
plt.ylabel('Strength')
plt.title('FFT')
plt.legend()


plt.show()
