async function call_awk(sourceText, awk_command) {
    console.info("source text", sourceText, "\nawk command", awk_command)
    const awk = await awkJS()
    return awk.awk(sourceText, awk_command, [])
}

const SOLUTIONS = {
    'exercise_1': '{ if ($1 == "Bill" || $1 == "Becky") { print $3 } }',
    'exercise_2': '{ arr[$1] += $2 } END { print arr["Moondog"] }',
    'exercise_3': '{ arr[$1] += $2 } \nEND { \n    for (key in arr) {\n         print key " " arr[key]\n     }\n }',
    'exercise_4': '{ arr[$1] += $2 } \n' +
        'END { \n' +
        '    max = "not_set";\n' +
        '    for (key in arr) {\n' +
        '         if (arr[key] > max || max == "not_set") {\n' +
        '             max = arr[key]\n' +
        '         }\n' +
        '    }\n' +
        '    print max\n' +
        ' }',
    'exercise_5': 'END { \n' +
        '    arr[0] = 0\n' +
        '    arr[1] = 1\n' +
        '    for (i = 2 ; i < 100; i++) {\n' +
        '        arr[i] += arr[i-1] + arr[i-2]\n' +
        '    }\n' +
        '    for (i = 0; i < 100; i++) {\n' +
        '        total += arr[i]\n' +
        '        print i " " total\n' +
        '    } \n' +
        '}\n',
    'exercise_6': 'END {\n' +
        '    for ( i = 1; i < 100; i++) {\n' +
        '        arr[i] = i\n' +
        '    }\n' +
        '    for ( i = 2; i < 100; i++) {\n' +
        '        for ( curr = i + i; curr < 100; curr += i) { \n' +
        '            delete arr[curr]\n' +
        '        }\n' +
        '    }\n' +
        '    for ( i = 0; i < 100; i++) {\n' +
        '        if (i in arr) { print i }\n' +
        '    }\n' +
        '}',
}


async function run_awk_input(button) {
    const awkCommand = button.parentElement.querySelector('.awk_src').value; // awk command
    const outputNode = button.parentElement.querySelector('.awk_output'); // where output goes
    const docId = button.parentElement.dataset['awk_file'];
    console.info(docId, button.parentElement.dataset);
    const awkFileText = document.getElementById(docId).value;
    console.info("awkfiletext", awkFileText, "awkCommand", awkCommand);
    outputNode.style.display = "block";


    let output = null;
    try {
        output = await call_awk(awkFileText, awkCommand);
    } catch {
        console.info("adding exception");
        outputNode.classList.add('exception')
        outputNode.innerText = "Exception: An unknown error occurred... \n(make sure expressions are inside {}s)";
        return
    }
    if (output.stderr !== "") {
        console.info("adding exception");
        outputNode.classList.add('exception')
        outputNode.innerText = "Exception: " + output.stderr;
        return
    }
    outputNode.classList.remove('exception')
    outputNode.classList.remove("correct")
    outputNode.classList.remove("incorrect")


    const oracle_output = await call_awk(awkFileText, SOLUTIONS[button.parentElement.dataset['awk_soln']]);

    if (oracle_output.stdout === output.stdout) {
        outputNode.classList.add("correct")
        outputNode.innerText = output.stdout;
    } else {
        console.info(oracle_output.output, output.stdout)
        outputNode.classList.add("incorrect")

        outputNode.innerText = ">>> Doesn't match known solution. Try again or press 'Reveal Solution'\n" + output.stdout
    }

}


function reveal(button) {
    const awk_soln = button.parentElement.dataset['awk_soln'];
    const awk_src = button.parentElement.querySelector('.awk_src');
    awk_src.value = SOLUTIONS[awk_soln];
    console.info(awk_src);
    const run_button = awk_src.parentElement.parentElement.querySelector('.awk_run')
    run_awk_input(run_button);
}