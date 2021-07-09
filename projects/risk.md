---
project: Risk
layout: project
title:  "Risk battle result visualizer, more than just a percentage"
---
<script src="/assets/risk.js"></script>
<style>
.resultList, .resultList * {
    box-sizing: border-box;
}
.colorBar {
    color: white;
    padding: .1rem;
    padding-bottom: .2rem;
    text-shadow: 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black;
}
.colorBar.green {
    background-color: green;
}
.colorBar.red {
    background-color: red;
}

ul {
    margin-left: 0;
    padding-left: 0;
}
li {
    list-style-type: none;
}

.soldier { 
    height: 1.5rem;
}
</style>

Most risk calculators just give you a % chance of success. 
This one shows you a 2d representation of all the possible outcomes to help you make better `risky` decisions

<form id="form" onchange="refresh()">
<div>
    <label for="yours">Your troops</label><br/>
    <input value="5" min="2" id="yours" name="yours" type="number" placeholder=5 />
</div>

<div>
    <label for="opp">Opponent's Troops</label><br/>
    <input value="2" min="1" id="opp" name="opp" type="number" placeholder=3 />
</div>
</form>

<ul>
<div id="results">
    
</div>
</ul>