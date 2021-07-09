function roll() {
    return Math.floor(Math.random() * 6) + 1
}

function rollDice(numDice) {
    let arr = []
    for (let i = 0; i < numDice; i++) {
        arr.push(roll())
    }
    arr.sort(function (a, b) {
        return a < b
    })
    return arr;
}

function min(a, b) {
    return a < b ? a : b;
}

function run_one_battle(numYours, numOpp) {
    let yours = numYours;
    let opp = numOpp;
    while (yours > 1 && opp > 0) {

        const yourNumDice = yours >= 3 ? 3 : (yours > 2 ? 2 : 1);
        const oppNumDice = opp >= 2 ? 2 : 1;
        const yourDice = rollDice(yourNumDice);
        const oppDice = rollDice(oppNumDice);
        for (let i = 0; i < min(yourDice.length, oppDice.length); i++) {
            if (yourDice[i] > oppDice[i]) {
                opp--;
            } else {
                yours--;
            }
        }
    }
    return {yours, opp}
}


function run_many_battles(yours, opp, how_many) {
    const results = {}
    results['1:1'] = 0;
    for (let i = 2; i <= yours; i++) {
        results[`${i}:0`] = 0;
    }
    for (let i = opp; i >= 1; i--) {
        results[`1:${i}`] = 0;
    }
    for (let i = 0; i < how_many; i += 1) {
        const result = run_one_battle(yours, opp);
        const key = `${result['yours']}:${result['opp']}`
        results[key] += 1;
    }
    return results;
}


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function parse_score(string) {
    return {
        "yourTroops": parseInt(string.split(':')[0], 10),
        "oppTroops": parseInt(string.split(':')[1], 10)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    refresh();
})

function addSoldier(color, parent)
{
    const img = document.createElement('img')
    img.classList.add('soldier')
    img.classList.add('soldier-1')
    img.src = `/assets/images/risk/soldier-${color}.svg`
    parent.appendChild(img);
}

function addResultRow(score, count, maxCount, totalRan, parent) {
    const {yourTroops, oppTroops} = parse_score(score);
    const li = document.createElement("li");
    // li.textContent = `${yourTroops} vs ${oppTroops}`
    parent.appendChild(li);
    li.classList.add('resultList')
    for (let i = 0; i < yourTroops; i++) {
        addSoldier("green", li)
    }
    for (let i = 0; i < oppTroops; i++) {
        addSoldier("red", li)
    }




    const span = document.createElement('div')
    li.appendChild(span);
    span.innerText = `${Math.round(100*count/totalRan)}%`;
    span.style.width = `${100*count/maxCount}%`;
    span.classList.add('colorBar')
    span.classList.add(oppTroops === 0 ? 'green' : 'red');
    span.title = `This result came up ${count} times in the simulations ran`

}

refresh = function () {
    const form = document.getElementById('form');
    const howMany = 10000;
    const {yours, opp} = Object.fromEntries(new FormData(form).entries());
    if (yours === "" || opp === "") {
        return;
    }
    const yoursInt = parseInt(yours, 10);
    const oppInt = parseInt(opp, 10);
    if (yoursInt < 0 || oppInt < 0) {
        alert("No negative numbers!")
    }
    const results = run_many_battles(yoursInt, oppInt, howMany);
    console.info(results);
    const div = document.getElementById('results');
    removeAllChildNodes(div);
    const entries = Object.entries(results)
    entries.sort(function (a, b) {
        return parse_score(b[0])["yourTroops"] - parse_score(a[0])["yourTroops"];
    })
    let maxCount = 0;
    for (const [score, count] of entries) {
        maxCount = maxCount > count ? maxCount : count;
    }
    for (const [score, count] of entries) {
        addResultRow(score, count, maxCount, howMany, div)
    }

}