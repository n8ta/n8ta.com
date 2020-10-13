---
project: PID Control of a Brushed DC Motor using a PIC32 Microcontroller
layout: project
title:  "PID Control of a Brushed DC Motor using a PIC32 Microcontroller"
---

### Purpose

Designed a PID controller for a DC brushed motor as part of MECH_ENG 333 at Northwestern University.
 
### Design

Here's the overall control diagram

![control](/assets/images/pid.png)

We have two control loops, 
1. Monitoring the current through the motor and adjusting to match the requested torque using a heuristic  
2. Monitoring the actual angle of the motor and determining the appropriate torque

### Features

The main feature was turning the motor to a desired angle without significant overshoot. You can see that here

<video width="400" controls>
    <source src="/assets/video/pid.mp4" type="video/mp4">
    Sorry your browser doesn't support the html video element
</video>

The controller also supported manually setting the PWM, pulse width modulation, tracking a given trajectory and a few other 
feature designed for testing.

### Visualization

To make sure the inner control loop was working as intended I produced a graph goal current (red circle) vs the actual current (red triangle).
The PWM is shown in green though it is less important. This showed that although there is noise the current and goal current map fairly closely.

![PWM vs Current](/assets/images/pid2.png)