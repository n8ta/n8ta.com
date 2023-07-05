---
project: Facedeck
layout: project
title:  "Facedeck: Flashcards to help professors with big classes learn their students"
---

### Purpose

Facedeck provides a deck of cards (with student photos) that professors can flip through to learn their students names. 
The stack of cards adapts as you get students right and wrong so you can practice those you get wrong more.

Facedeck has existed at northwestern for a long time and I had the project or rewriting it (the existing project was in laravel and was poorly structured which made it difficult to extend). 
I was able to rewrite the system in less than a week (with about 30% the lines of code of the old system) and then get started on new features. 

The other group facedeck serves is residence hall leaders. Since there's no good API available for finding out which students are in a resident hall, 
I added API endpoints that Student Affairs uses to create custom groups on facedeck.
 
### Tech

1. API for custom groups of students
2. Vanilla JS stack of cards
3. Canvas learning tool integration 

While I would have loved to use react for the front end of facedeck (especially the stack portion). McCormick IT prioritizes maintainability since it supports dozens of applications with a small team.
This means doing things the same way everywhere is hugely important for developer efficiency. For the same reason bootstrap
is used heavily. The app's own stylesheet is less than 100 lines. K.I.S.S.

The API for facedeck allows the office of student  affairs to perform the normal CRUD actions on custom groups of students and specify who is in them + who can view them. The API uses json. Here's the api spec I wrote [https://rentry.co/9wb26](https://rentry.co/9wb26).

So facedeck is a rails app with a big old javascript class to handle the interactive stack component. This is what that component looks like before a students name is revealed

Before a professor sees their class they are given a list of terms and then classes (in that term) to pick from. The data is all pulled from
Northwestern's registrar in real time (with caching of course, we're not trying to be rude). Here's what that look like before they reveal the students name:

Forgive the blurs I don't want to share anyone's photo that they don't want shared.

![stack view reveal mode](/assets/images/facedeck/start_start.png)

And here is what it looks like after 
![stack view reveal mode](/assets/images/facedeck/start_mid_answer.png)

The system also provides tooltips the first time you see a page explaining how everythig works.

The app looks view similar in canvas (only the menu bar is omitted for a more consistent experience with canvas).
![stack view within canvas](/assets/images/facedeck/canvas_integration.png)




So that's what it does!
