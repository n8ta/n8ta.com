---
layout: post
title:  "Chaining DS18B20 or any 1-wire protocol devices (raspberry pi 4)"
date:   2020-12-26 09:00:00 +0700
categories: [Electronics, RaspberryPi]
---

## Circuitry
![Circuit diagram of two DS18B20](/assets/images/chain.png)

I have one raspberry pi 4 with only one pin that can read the 1-wire protocol. I have 6 DS18B20 temperature sensors I want to use.
It turns out the 1-wire protocol is a bus protocol meaning a single wire can be shared by many devices trying to communicate. All you need to do is connect the 
dat lines of each sensor as shown in the diagram above.

Notes: I use pin 2 on my pi4 (5v power) and pin 39 (GND) as vcc and gnd.

## Code

1. Ensure this line is present in `/boot/config.txt`
```text 
dtoverlay=w1-gpio
```
Then reboot
```
sudo reboot
```

2. Identify your devices 
```
ls /sys/bus/w1/devices
=> 28-011939e3f4d8  28-01204e866407  w1_bus_master1
ls /sys/bus/w1/devices/28-011939e3f4d8
=> ... uevent  w1_slave ...
```
They will start with 28 then a - and then the serial of your device.<br>Mine are  `28-011939e3f4d8` and `28-01204e866407`.<br/>
The file we will be using is inside this folder and called `w1_slave`.

3. Read from them<br/><br/>
Here's the script I use to do that. I stole the original from [here](https://thepihut.com/blogs/raspberry-pi-tutorials/18095732-sensors-temperature-with-the-1-wire-interface-and-the-ds18b20)
and modified it to handle multiple devices.
<br/><br/>
Just modify the array `files` at the start of the script with your own device serial numbers. The files array can be any length > 1.

    ```python
    import os
    import time
    
    # Initialize the GPIO Pins
    os.system('modprobe w1-gpio')  # Turns on the GPIO module
    os.system('modprobe w1-therm')  # Turns on the Temperature module
    
    files = ['/sys/bus/w1/devices/28-011939e3f4d8/w1_slave', '/sys/bus/w1/devices/28-01204e866407/w1_slave']
    
    # A function that reads the sensors data
    def read_temp_raw():
        lines = []
        for path in files:
            f = open(path, 'r')
            lines.append(f.readlines())
            f.close()
        return lines
    
    def read_temp():
        lines = read_temp_raw()
        for i, line_set in enumerate(lines):
            while line_set[0].strip()[-3:] != 'YES':
                time.sleep(0.2)
                lines[i] = read_temp_raw()
    
        equal_pos = []
        for line_set in lines:
            equal_pos.append(line_set[1].find('t='))
    
        temps = []
        for i, pos in enumerate(equal_pos):
            if pos != -1:
                temp_string = lines[i][1][pos + 2:]
                temp_c = float(temp_string) / 1000.0
                temp_f = temp_c * 9.0 / 5.0 + 32.0
                temps.append(temp_f)
    
        return temps
    
    while True:
        t = read_temp()
        temps =  ",".join([str(round(x,2)) for x in t])
        print(f"{time.time()},{temps}", flush=True)
        time.sleep(30)
    ```
   
## Note
This is part 1 of a project to create a PID controlled reptile heat mat. Buying a proportional thermostat that would accomplish the same
thing would cost $60->$200. Far more expensive than spending 30 hours on it myself.   
