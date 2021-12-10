---
project: Facets
layout: project
title:  "FACETS: Faculty Advancement Consolidated Evaluation Tracking System for Northwestern University"
---

### Purpose

FACETS is a tool I built at Northwestern University to track professors through the tenure process. The tool gets used by the administration, faculty, and professors at other universities to compile all the information 
needed to discuss a tenure case.

Unfortunately this system is only accessible to professor @ Northwestern so you likely cannot see the [live site](https://facets.mccormick.northwestern.edu/). There are many screenshots below.

### Tech

FACETS is essentially a complicated file storage system that provisions access on the fly based on human resources data.
The system parses those apis responses to determine:

1. Are they a professor? 
2. What kind? Full, assistant, instruction? 
3. Whose cases can they view?
4. Which documents in those cases?

FAECTS also allows for custom roles to be added to users like Department Administrator,
Dean, Provost, etc. which all allow different levels of access for special admin folks.

The other complexity the system handles is allowing people who do not have access to a Northwestern University single-sign-on account (netid) to access the system to upload their reference letters (about faculty up for tenure).
To handle these people I added the ability facets to generate secure one time use tokens that can be emailed and allow the recipient to upload
a single document into the case (and then revoke access). The tokens look something like this [facets.mccormick.northwestern.edu/tokens/35783cf2672835428f8c08f88c9f7da3b024d292](#).

The coolest features for the end users are, 

1. PDF merge of entire case or selected docs (I swear MANY people merge the case into one pdf and print it),
2. ZIP of selected documents
3. Auto file naming (previously the department administrators renamed all files by hand to match a convention)
4. Drag and drop file upload (dropzone.js -> rails endpoint)
 
Here's a few of those features

1. Index of current cases  
    {% include picture.html src="/assets/images/facets/cases.png" alt="multiple cases" %}

2. A particular case and its subfolders, notice the PDF and ZIP buttons
    {% include picture.html src="/assets/images/facets/case_expanded.png" alt="single case view" %}
    
3. Drag and drop document upload within a folder
    {% include picture.html src="/assets/images/facets/drag_and_drop.png" alt="two files being dragged and dropped to upload" %}
    
4. Editing a user with custom roles 
    {% include picture.html src="/assets/images/facets/user%20view%20edit.png" alt="editting a user" %}
    
5. Creating a token (this is something an admin would do), they then click the copy icon and email the token.
    {% include picture.html src="/assets/images/facets/copy%20token.png" alt="creating a token text field" %}

6. Using a token (limited system access for external people)
    {% include picture.html src="/assets/images/facets/token%20view.png" alt="creating a token text field" %}
