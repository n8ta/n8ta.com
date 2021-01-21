import matplotlib.pyplot as plt
import matplotlib.dates as md
import datetime
import numpy
import scipy.fft
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

plt.subplot()
plt.plot(last_200_times, temps[0], label="Ambient")
plt.plot(last_200_times, temps[1], label=f"Snake Enclosure Temp")
plt.xlabel('Time')
plt.ylabel('Temp deg F')
plt.title('Snake Temps ')
plt.legend()
plt.ylim(60, 100)

plt.xticks( rotation=25 )
ax=plt.gca()
xfmt = md.DateFormatter('%H:%M')
ax.xaxis.set_major_formatter(xfmt)

plt.show()
