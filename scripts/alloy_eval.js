window.addEventListener('load', function () {
  const getTimeRange = (timeString) => {
    // Convert the time string to a Date object
    const time = new Date(timeString);
    // Check if the date is valid
    if (isNaN(time.getTime())) {
        return "Invalid time format";
    }
    // Calculate 1 hour before and after
    const oneHourBefore = new Date(time.getTime() - 60 * 60 * 1000);
    const oneHourAfter = new Date(time.getTime() + 60 * 60 * 1000);
    // Format the dates to ISO string
    const formattedOneHourBefore = oneHourBefore.toISOString();
    const formattedOneHourAfter = oneHourAfter.toISOString();
    // Return the formatted dates in an array
    return [formattedOneHourBefore, formattedOneHourAfter];
}

  const set_link = () => {
    let eval_btn = document.querySelector('.evaluation-header div div button');
    if (eval_btn) {
      if (eval_btn.classList.contains('injected')) {

      } else {
        let eval_token = document.querySelector(".evaluation-header div div button pre").innerText;
        let date = document.querySelector(".evaluation-header").children.item(1).children.item(0).children.item(2).children.item(1).innerText;
        let times = getTimeRange(date);
        let os_link = "https://opensearch.alloy.sdm.network/_dashboards/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:'"+times[0]+"',to:'"+times[1]+"'))&_a=(columns:!(module,msg),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:aacac0b0-b114-11ed-9c20-5b437ab849c3,key:evaluationToken,negate:!f,params:(query:" + eval_token+ "),type:phrase),query:(match_phrase:(evaluationToken:" + eval_token+ ")))),index:aacac0b0-b114-11ed-9c20-5b437ab849c3,interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',asc)))";
        let inject_link = document.createElement('a')
        inject_link.setAttribute('href', os_link);
        inject_link.setAttribute('target', '_blank')
        inject_link.innerText = "Logs"
        eval_btn.appendChild(inject_link);
        eval_btn.classList.add("injected");
      }
    }
    setTimeout(set_link, 1000);
  }
  set_link();

//function to read cookie values by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift(); 
}
const loadAccountData = (context) => {
  document.cookie = "agent_name=" +context.agent.first_name+ ";expires=Thu, 07 May 2025 12:00:00 UTC;domain=app.alloy.co;path=/"
  document.cookie = "agent_email=" +context.agent.email+ ";expires=Thu, 07 May 2025 12:00:00 UTC;domain=app.alloy.co;path=/"
  /* set more data*/
}
//get alloy cookie for requests
let csrftoken = getCookie("csrftoken-corekube-prod");
let context;

fetch("https://app.alloy.co/v3/user_context/", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-csrftoken": csrftoken,
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://app.alloy.co/v3/dashboard/home/",
  "referrerPolicy": "same-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then(function(response) { return response.json(); })
.then(function(json) {
  context = json;
  loadAccountData(context);
})
});


