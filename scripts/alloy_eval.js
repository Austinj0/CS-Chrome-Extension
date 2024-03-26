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

})