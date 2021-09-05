---
project: Windows key remapper (registry)
layout: project
title:  "Generate a registry update file to re-map windows keys"
---

<script src="/assets/scancode.js"></script>


<link href="/assets/css/scancode.css" type="text/css">
<div id="scancode">

<br/>
<p>Just insert all the re-mappings you want, download, run the registry file, reboot.</p> <p>Use the NOTHING option to just kill a key and not remap.</p>

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
    <textarea readonly autocomplete="false" id="result">
    </textarea>
</div>

<div class="right">
<button title="After downloading double click the file to run, accept the pop-up, and restart" onClick="download()">Download</button>
</div>

<ul id="mappings">
</ul>

</div>

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<code><small>
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</small></code>