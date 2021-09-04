---
project: Windows registry key remapper
layout: project
title:  "Generate a registry update file to re-map windows keys"
---

<script src="/assets/scancode.js"></script>
<link href="/assets/css/scancode.css" type="text/css">
<div id="scancode">

<br/>
<div class="hcon">

    <div>
        <label for="from">From
        </label><br/>
        <select id="from">
            <option>Loading...</option>
        </select>
    </div>

    <div>
        <label for="to">To
        </label><br/>
        <select id="to">
            <option>Loading...</option>
        </select>
    </div>

    <div>
    <label>Insert</label><br/>
    <button id="add" onClick="insert()">
        Add Mapping
    </button>
    </div>



</div>

<div id="result-container">
    <span>swap-keys.reg</span>
    <textarea id="result">
    </textarea>
</div>

<ul id="mappings">
</ul>

</div>