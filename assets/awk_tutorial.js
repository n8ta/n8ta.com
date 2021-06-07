const CMD_START = "awk '"

async function handle_enter(input) {
    const awk = await awkJS()
    const filename = input.dataset['awk_file']
    const sourceText = document.getElementById(filename).value
    const awkStr = input.value.replace("\n", "");
    if (!awkStr.startsWith(CMD_START)) {
        alert("Your command must start with `awk '`");
        return
    }
    if (!awkStr.endsWith('\' ' + filename)) {
        alert("Your command must end with `' " + filename + "`")
        return
    }
    let awkStrParsed = awkStr.substr(5, awkStr.length - (4 + filename.length + 3))
    const output = awk.awk(sourceText, awkStrParsed, []);
    if (output.stderr !== "") {
        alert("awk error: ", output.stderr)
        return
    }
    const outputNode = document.getElementById(input.dataset['output_id'])
    outputNode.innerText = output.stdout;
}

const SOLUTIONS = {
    'hello_world': 'awk \'{ print $1 " " $2 }\' mail_list',
    'column_1': 'awk \'$1 == "Bill" { print $2 }\' mail_list',
}
function reveal(element) {
    const output = document.getElementById(element + "_output")
    const console = document.getElementById(element)
    console.innerText = SOLUTIONS[element]
    handle_enter(console)
}

document.addEventListener("DOMContentLoaded", function(event) {
    const inputs = document.getElementsByClassName('awk_input');
    for (let i =0 ; i < inputs.length; i ++) {
        inputs[i].addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault()
                handle_enter(inputs[i])
            }
        })
    }
});
