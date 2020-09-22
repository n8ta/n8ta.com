---
layout: project
project: Herpetology.pro
title:  "HerpetologyPro: Teaching people about herpetology and to identify herps in their area."
---

<img alt='link icon' src="/assets/images/external.png" class="external-img"/>
[herpetology.pro](https://herpetology.pro)

### Purpose

[herpetology.pro](https://herpetology.pro) is a website designed to teach people to identify reptiles and amphibians in their area. 
It proves two modes, competivie and learning. In competivie mode you compete on the scoreboard with other users on the accuracy
of your IDs. In learning mode you see a smaller subset of species at a time and new species are added slowly as you master them.

### Tech
 
The website is a react-rails app, meaning a react front-end with serve side render from rails when appropriate. Rails serves
all the json needed leveraging rail's excellent model system but leaves the front end to react.

Here are a fun components used in the site:
0. Google sign in
    ![screenshot of learning mode](/assets/images/google.png)

1. Learning component stores data to localStorage allowing the user to pickup where they left off later. (See progress bars)

    ![screenshot of learning mode](/assets/images/learn.png)

2. Fancy freakin menus

    ![screenshot of learning mode](/assets/images/menu.gif)

3. Interactive reports save screen space by not showing all reporting options right away. Reports are used to correct incorrectly tagged images.
    ![screenshot of a report before it's created](/assets/images/report1.png)
    
    ![screenshot of a report before it's created](/assets/images/report2.png)
4. Real time interactive search
    ![screenshot of a search area](/assets/images/filter.png)
5. Persistent settings (posted to server)
    ![screenshot of a settings dialog](/assets/images/settings.png)

