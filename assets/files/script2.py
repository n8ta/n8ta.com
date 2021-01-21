import matplotlib.pyplot as plt
import matplotlib.dates as md
import datetime
import numpy
import scipy.fft
from scipy.fftpack import fftfreq
import scipy.signal.windows

SAMPLING_PERIOD_IN_S = 30

path = "./log.txt"

f = open(path, 'r')

times = []
temps = [[],[]] # First is ambient, seconds is enclosure
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
last_200_times = times[len(times)-200:]


Y = scipy.fft.fft(temps[1])
freq = fftfreq(200, SAMPLING_PERIOD_IN_S)
freq = [(1/f) / 60 for f in freq ]
Y = [abs(y) for y in Y]


plt.subplot()
plt.plot(freq, Y, label="")
plt.xlabel('Period in Minutes')
plt.ylabel('Strength? Idk ask someone who knows more math')
plt.title('FFT')
plt.legend()

plt.show()
