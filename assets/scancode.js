user_mappings = {};
alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
map = {};

async function get_scancodes() {
    let text = (await (await fetch('/assets/scancodes.txt')).text()).split("\n");
    for (const code of text) {
        let hex = code.substr(0, 2).toString();
        let human = code.substr(2, code.length - 2).trim().toString();
        map[hex] = human;
    }
    console.info(map);
    update_selects()
}

get_scancodes()

let init = "Windows Registry Editor Version 5.00\n" +
    "\n" +
    "[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Keyboard Layout]\n" +
    "\"Scancode Map\"=hex:00,00,00,00,00,00,00,00,"


document.addEventListener('DOMContentLoaded', function () {
    console.info("LOADED");
    let fom = document.getElementById('from');
    let to = document.getElementById('from');
    let result = document.getElementById('result');
    result.value = init;
});

function insert() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    if (Object.keys(user_mappings).indexOf(from) !== -1) {
        alert(`You already have a mapping from the key ${map[from]} to ${map[user_mappings[from]]}`);
        return;
    }
    user_mappings[from] = to;
    console.info("mapped!", map[from], map[to]);
    update_selects();
    update_output();
    update_mappings_ui(from, to);
}
function update_output() {
    let result = document.getElementById('result');
    let output = init;
    for (const [from, to] of Object.entries(user_mappings)) {
        output += `${map[from]} => ${map[to]} `
    }
    result.value = output;
}

function update_mappings_ui(from, to) {
    const mappings = document.getElementById('mappings');
    const li = document.createElement('li');
    let text = document.createElement('span');
    text.textContent = `  ${map[from]} => ${map[to]}`
    const remove = document.createElement('button')
    remove.classList.add("rm-button")
    remove.textContent = "❌";
    li.appendChild(remove);
    li.appendChild(text);
    mappings.appendChild(li);
    remove.addEventListener('click', function() {
        delete user_mappings[from];
        update_selects();
        update_output();
        mappings.removeChild(li);
    })
}


function update_selects() {
    let from_select = document.getElementById('from');
    let to_select = document.getElementById('to');
    from_select.innerHTML = "";
    to_select.innerHMTL = "";

    let froms = Object.keys(user_mappings);
    let tos = Object.values(user_mappings);

    while (from_select.childNodes.length > 0) {
        from_select.removeChild(from_select.firstChild);
    }
    while (to_select.childNodes.length > 0) {
        to_select.removeChild(to_select.firstChild);
    }


    let hexes = Object.keys(map);
    hexes.sort(function (aa, bb) {
        let a_val = map[aa];
        let b_val = map[bb];
        let a_index = alphabet.indexOf(a_val.toLowerCase());
        let b_index = alphabet.indexOf(b_val.toLowerCase());
        if (a_index === -1 && b_index === -1) {
            return a_val.toLowerCase().localeCompare(b_val.toLowerCase());
        } else if (a_index === -1 && b_index !== -1) { // b in alpha
            return 1;
        } else if (a_index !== -1 && b_index === -1) {
            return -1;
        } else {
            return a_index > b_index ? 1 : -1;
        }
    })
    for (let hex of hexes) {
        if (froms.indexOf(hex) === -1) {
            let option = document.createElement('option');
            option.value = hex;
            option.text = map[hex];
            from_select.appendChild(option)
        } else {
            console.info("not appending ", hex);
        }
        if (tos.indexOf(hex) === -1) {
            let option = document.createElement('option');
            option.value = hex;
            option.text = map[hex];
            to_select.appendChild(option)
        } else {
            console.info("not appending ", hex);
        }
    }


}
