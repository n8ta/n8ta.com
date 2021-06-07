---
project: awk
layout: project
title:  "Basic awk: An interactive introduction to awk"
---

### Basic `awk`: An interactive introduction to awk
<script src="/assets/awk.js"></script>
<script src="/assets/awk_tutorial.js"></script>
awk is a language that takes whitespace separated input files (columns), matches them against patterns, and executes code for each match.

```text
pattern { code } #  runs when line matches pattern
{ code } #  matches any line
```

Here's an example of data ready for awk to process `./mail_list`. You can edit this data!
<textarea class="awk_text" id="mail_list">
Amelia    555-5553  amelia.zodiac@gmail.co      F
Anthony   555-3412  anthony.assert@hotmail.com  A
Becky     555-7685  becky.algebrarum@gmail.com  A
Bill      555-1675  bill.drowning@hotmail.com   A
Bill      555-7516  bill.number2@hottermail.co  A
Broderick 555-0542  aliquotiens@yahoo           R
Camilla   555-2912  camilla.infusa@skynet.be    R
Fabius    555-1234  fab.undevicesimus@ucb.edu   F
Julie     555-6699  julie.persc@skeeve.co       F
Martin    555-6480  mart.codicibus@hotmail.com  A
Samuel    555-3430  samu.lanceolis@shu.edu      A
Jean-Paul 555-2127  jean.campanorum@nyu.edu     R
</textarea>


Let's try an easy example with no pattern. Printing the first column. 

Try printing multiple columns `$2 $3`. Try adding a space between those columns by
using " " (no spaces needed for concatenation)
<textarea data-awk_file="mail_list" data-output_id="hello_world_output" class="awk_input" id='hello_world'>
awk '{ print $1 }' mail_list
</textarea>
<pre class="awk_output" id="hello_world_output"></pre>
<button onClick='reveal("hello_world")'>Reveal</button>

Okay how about a pattern? You saw `$1` means column one. How about printing the phone number for every Bill?

<textarea data-awk_file="mail_list" data-output_id="column_1_output" class="awk_input" id='column_1'>
awk '$1 == "Bill" { print "Can you make this print the phone number?" }' mail_list
</textarea>
<pre class="awk_output" id="column_1_output"></pre>
<button onClick='reveal("column_1")'>Reveal</button>