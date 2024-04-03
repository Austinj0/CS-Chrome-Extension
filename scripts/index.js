const search = document.querySelector("#search");
const find = document.querySelector("#submit");
const switches = document.querySelectorAll(".switch-input");
//const git = document.querySelector(".git");
const ui_buttons = document.querySelectorAll(".circle");
const accountDetails = document.querySelector("#accountDetails");
const closeAccountDetails = document.querySelector("#closeAccountDetails");
const agent_email_ui = document.querySelector("#agent_email");
const agent_name_ui = document.querySelector("#agent_name");
console.log(closeAccountDetails)
const openAccountDetails = document.querySelector("#openAccountDetails");
const labels = [
    "L-xxxxxxxxxxxxxxxxxxxx",
    "JA-xxxxxxxxxxxxxxxxxxxx",
    "Client Name"
]
let search_function = 0;
for (i = 0; i < switches.length; i++) {
    let label = labels[i];
    let search_option = i;
    switches[i].addEventListener('click', function () {
        search.placeholder = label;
        search_function = search_option;
    })
}

let eval_token, client, ja_token;
const checkEval = (input) => {
    // Regular expression pattern
    var regex = /^[SL]-[A-Za-z0-9]{20}$/;
    if (regex.test(input)) {
        return true;
    } else {
        return false;
    }
}
const checkJA = (input) => {
    // Regular expression pattern
    var regex = /^JA-[a-zA-Z0-9]{20}$/;
    if (regex.test(input)) {
        return true;
    } else {
        return false;
    }
}

const validate = (e) => {
    if (search_function == 0) {
        if (checkEval(search.value)) {
            find.classList.remove("disabled")
        } else {
            find.classList.add("disabled")
        }
    } else if (search_function == 1) {
        if (checkJA(search.value)) {
            find.classList.remove("disabled")
        } else {
            find.classList.add("disabled")
        }
    }
}
search.addEventListener('paste', validate, false);
search.addEventListener('keyup', validate, false);

find.addEventListener('click', function () {
    if (find.classList.contains("disabled")) {

    } else {
        if (search_function == 0) {
            eval_token = search.value;
            let eval_link = "https://opensearch.alloy.sdm.network/_dashboards/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-3M,to:now))&_a=(columns:!(module,msg),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:aacac0b0-b114-11ed-9c20-5b437ab849c3,key:evaluationToken,negate:!f,params:(query:" + eval_token + "),type:phrase),query:(match_phrase:(evaluationToken:" + eval_token + ")))),index:aacac0b0-b114-11ed-9c20-5b437ab849c3,interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',asc)))"
            window.open(eval_link, '_blank').focus();
        } else {
            ja_token = search.value;
            let ja_link = "https://opensearch.alloy.sdm.network/_dashboards/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-3M,to:now))&_a=(columns:!(module,msg),filters:!(),index:aacac0b0-b114-11ed-9c20-5b437ab849c3,interval:auto,query:(language:kuery,query:%22" + ja_token + "%22),sort:!(!('@timestamp',asc)))"
            window.open(ja_link, '_blank').focus();
        }
    }
})
/*
git.addEventListener('click',function(){
    window.open("https://github.com/Austinj0/CS-Chrome-Extension", "_blank").focus();
})
*/
for (i = 0; i < ui_buttons, length; i++) {
    ui_buttons[i].addEventListener('click', function () {
        ui_buttons[i].classList.toggle("active");
    })
}

openAccountDetails.addEventListener('click', function () {
    accountDetails.classList.toggle("hidden");
    openAccountDetails.classList.toggle("active")
})
closeAccountDetails.addEventListener('click', function () {
    accountDetails.classList.toggle("hidden")
    openAccountDetails.classList.toggle("active")
})

function getCookies(AlloyCookies, callback) {
    chrome.cookies.getAll(AlloyCookies, function (cookie) {
        if (callback) {
            callback(cookie);
        }
    });
}
function filterCookiesByName(entries, name) {
    // Filter the array for entries with the specified name
    const filteredEntries = entries.filter(entry => entry.name === name);
    
    // If no matching entry found, return null or handle accordingly
    if (filteredEntries.length === 0) {
        return null; // or return undefined, throw an error, etc.
    }
    
    // Return the value of the first matching entry
    return filteredEntries[0].value;
}
const setAlloyData = (data) => {
const agent_name = filterCookiesByName(data, "agent_name")
const agent_email = filterCookiesByName(data, "agent_email")
agent_email_ui.innerText = agent_email;
agent_name_ui.innerText = agent_name;
}
//usage:
getCookies({domain:".app.alloy.co"}, function (data) {
    setAlloyData(data)
});




