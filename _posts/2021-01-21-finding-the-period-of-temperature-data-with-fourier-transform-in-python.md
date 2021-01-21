---
layout: post
title:  "Finding the period of temperature data using the fast fourier transform in python"
date:   2020-01-21 09:00:00 +0700
categories: [Electronics, RaspberryPi]
---

Let's say you have a log file of temperature data 
[say from a DS18B20](/electronics/raspberrypi/2020/12/26/Chaining-DS18B20-or-any-1-wire-protocol-devies-on-pi-4.html).
like [this one from my snake's enclosure](/assets/files/log.txt), and you want to know the period of that data (maybe temperature 
cycles daily? maybe every hour as the heater turns on?)

First install scipy
{% highlight bash %}
pip3 install scipy 
{% endhighlight %}

And then you can run this script (download the log file above)

{% highlight python %}
import scipy.fft
import scipy.signal.windows

SAMPLING_PERIOD_IN_S = 30

path = "./log.txt"

f = open(path, 'r')

temperatures = []
for line in f:
    _, _, temp = line.replace("\n", "").split(",")
    temperatures.append(float(temp))

# Just grab the last 100 minutes
enclosure_temps = temperatures[len(temperatures) - int(100 * 60 / SAMPLING_PERIOD_IN_S):]


##
## THIS IS THE FUNCTION YOU PROBABLY WANT TO COPY AND PASTE
##
def period_in_seconds(data, sampling_period):
    # data : an array of numbers
    # sampling_period : each element of data must be equally
    # spaced by 1 sampling period for fft to work
    mean = sum(data)/len(data)

    hann_window = scipy.signal.windows.hann(len(data))

    # All data is shifted by the mean and multiplied by the hann window
    pre_processed_data = [(x - mean) * hann_window[i] for i, x in enumerate(data)]

    # Then we take the fft of our data, the max of the array produced by fft is our period
    return float(max(scipy.fft.fft(pre_processed_data)).real) * sampling_period


period_in_s = period_in_seconds(enclosure_temps, SAMPLING_PERIOD_IN_S)
print(f"Period of the signal is {round(period_in_s)} s = {round(period_in_s/60,2)} mins")
{% endhighlight %}

And tada!
{% highlight bash %}
> python3 run.py
Period of the signal is 964 s = 16.07 mins
{% endhighlight %}

[#tldr on why this works](moral) 

Okay you're still here, maybe you're more interested in what the hell is happening here if so read on. First let's look at this raw data,
that's always important when data processing.

Note: There'll be a lot more code mostly related to graphing so I'm just going to link it from now on (all of the graphing code was written at 3am please do not judge too harshly). <small>[graphing code](/assets/files/script1.py)</small>


![graph of temperature over time](/assets/images/data1.png)


Pretty. So what happens if we just take the fourier transform of our snake enclosure temp data here. 
Omitting ambient. <small>[graphing code](/assets/files/script2.py)</small>


![graph of temperature over time](/assets/images/data2.png)

We can see our peaks at ~16 minutes. Nice. There is also a lot of noise and a sort of sloping peak at around +-100 minutes. Which is very suspicious because we used 100 minutes of data.
What if we tweak that last script to give us 400 minutes of data.

![graph of temperature over time](/assets/images/data3.png)

Well that's not good. It seems that as time goes by our real peak is being overshadowed by the total period of the data.
What can we do to fight this? Well we can can apply the hanning window. The hanning window is a method of weighting data that 
weights points near the edges lower than points near the center (preventing frequencies like the full period of the data from being important).
Let's look at our data, the hanning window, and the window applied to our data. <small>[graphing code](/assets/files/script3.py)</small>

![graph of temperature over time](/assets/images/data5.png)

Looking at the bottom left plot it's clear this isn't going to work. That malformed blob has lost most of our data. And the FFT confirms. This is wrong.
What we're missing is that because our data isn't centered on 0 (it's centered on 83F) the hann window is making all our data look the same. We've lost the ~local flavor~ of the 16 minute period.
So before we apply hann we are going to subtract the mean from all our data points. Check it out.  <small>[graphing code](/assets/files/script4.py)</small>

![graph of temperature over time](/assets/images/data7.png)

Okay so after we shift our temperatures down to 0 we can see the ~sin~ wave much more clearly. Then after we apply the hann window
the edges taper. Hopefully this will prevent the total time of the data from affecting the fft... And it does. The bottom right
looks perfect two strong peaks at +- 16.

<strong id='moral'>Moral of the story: before you run a fourier transform you need to subtract the mean of your data and apply a window. I'm not
an expert on fourier transforms or windowing but my reading suggests the hann window is good for 95% of cases (it was good for mine).</strong>