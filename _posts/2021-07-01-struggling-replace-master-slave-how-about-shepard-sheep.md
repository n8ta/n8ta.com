---
layout: post
title:  "Struggling to replace master slave, how about shepard sheep?"
date:   2021-07-01 10:00:00 +0700
categories: []
---

`Master` and `slave` are everywhere in computer science.

A `master` database server handles the writes and passes
them out to read replicas or `slaves`.

The git `master` branch.

To name the biggest two. For some these words conjure bad imagery and worse history.
There have been lots of attemps to replace them. There's also been a some  maligning the change as stupid,
ageist, and other nonesense [mostly bad arguements on quora](https://www.quora.com/What-do-you-think-about-few-major-software-removing-terms-master-and-slave-from-their-code-because-they-can-be-considered-offensive)

There have been a lot of a suggestions
1. parent/child
2. leader/follower
3. primary/replica


But all of these share one thing. They lack
<style>
.html-rainbow-text span {
	font-family: Arial;
	display: inline-block;
	font-weight: bold;
	font-size: 50px;
	text-shadow: #A3A3A3 1px 1px 1px;
}

</style>
<div class="html-rainbow-text" style="text-align: center;">
	<span style="color:#9400D3">I</span><span style="color:#4B0082">M</span><span style="color:#0000FF">A</span><span style="color:#00FF00">G</span><span style="color:#FFFF00">I</span><span style="color:#FF7F00">N</span><span style="color:#FF0000">A</span><span style="color:#FF7F00">T</span><span style="color:#FFFF00">I</span><span style="color:#00FF00">O</span><span style="color:#0000FF">N</span>
</div>

So I present my own alternative.

<img src="/assets/images/flock.jpg" />
<small><a style="color: black" href="https://photostockeditor.com/image/man-standing-in-front-of-group-of-lamb-2363">source</a></small>

# Shepard and Sheep

## Pros:
1. Contains sheep, everyone loves sheep
2. Not controversial
3. Contains shepard, good old timey imagery
4. Fun to say shhhh-eppp-ard shhhh-eeeyyypp

## Cons:
1. ¿ Doesn't include any other animals ?

Please help me spread the word. A suitable replacement has been found. It's time to

```shell
git pull origin shepard
kubectl create -f sheep
```