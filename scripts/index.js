const search = document.querySelector("#search");
const find = document.querySelector("#submit");
const switches = document.querySelectorAll(".switch-input");
const git = document.querySelector(".git");
const labels = [
    "L-xxxxxxxxxxxxxxxxxxxx",
    "JA-xxxxxxxxxxxxxxxxxxxx",
    "Client Name"
]
let search_function = 0;
for(i=0;i<switches.length; i++){
    let label = labels[i];
    let search_option = i;
    switches[i].addEventListener('click',function(){
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
  const checkJA= (input) => {
    // Regular expression pattern
    var regex = /^JA-[a-zA-Z0-9]{20}$/;
    if (regex.test(input)) {
      return true;
    } else {
      return false;
    }
  }

const validate = (e) => {
    if(search_function == 0) {
        if(checkEval(search.value)) {
            find.classList.remove("disabled")
        } else {
            find.classList.add("disabled")
        }
    } else if(search_function == 1) {
        if(checkJA(search.value)) {
            find.classList.remove("disabled")
        } else {
            find.classList.add("disabled")
        }
    }
}
search.addEventListener('paste', validate, false);
search.addEventListener('keyup', validate, false);

find.addEventListener('click', function(){
if(find.classList.contains("disabled")) {

} else {
    if(search_function == 0) {
        eval_token = search.value;
        let eval_link = "https://opensearch.alloy.sdm.network/_dashboards/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-3M,to:now))&_a=(columns:!(module,msg),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:aacac0b0-b114-11ed-9c20-5b437ab849c3,key:evaluationToken,negate:!f,params:(query:"+eval_token+"),type:phrase),query:(match_phrase:(evaluationToken:"+eval_token+")))),index:aacac0b0-b114-11ed-9c20-5b437ab849c3,interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',asc)))"
        window.open(eval_link, '_blank').focus();
    } else {
        ja_token = search.value;
        let ja_link = "https://opensearch.alloy.sdm.network/_dashboards/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-3M,to:now))&_a=(columns:!(module,msg),filters:!(),index:aacac0b0-b114-11ed-9c20-5b437ab849c3,interval:auto,query:(language:kuery,query:%22"+ja_token+"%22),sort:!(!('@timestamp',asc)))"
        window.open(ja_link, '_blank').focus();
    }
}
})

git.addEventListener('click',function(){
    window.open("https://github.com/Austinj0/CS-Chrome-Extension", "_blank").focus();
})
