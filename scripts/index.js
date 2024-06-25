const search = document.querySelector('#search')
const find = document.querySelector('#submit')
const switches = document.querySelectorAll('.switch-input')
// const git = document.querySelector(".git");
const uiButtons = document.querySelectorAll('.circle')
const accountDetails = document.querySelector('#accountDetails')
const settings = document.querySelector('#settings')
const SDK = document.querySelector('#SDK')
const panels = document.querySelectorAll('.inner_panel')
const closePanel = document.querySelectorAll('.close_panel')
const agentEmailUI = document.querySelector('#agentEmail')
const agentNameUI = document.querySelector('#agentName')
const labels = [
  'L-xxxxxxxxxxxxxxxxxxxx',
  'JA-xxxxxxxxxxxxxxxxxxxx',
  'Client Name'
]
let searchFunction = 0
for (let i = 0; i < switches.length; i++) {
  const label = labels[i]
  const searchOption = i
  switches[i].addEventListener('click', function () {
    search.placeholder = label
    searchFunction = searchOption
  })
}

let evalToken, jaToken
const checkEval = (input) => {
  // Regular expression pattern
  const regex = /^[SL]-[A-Za-z0-9]{20}$/
  if (regex.test(input)) {
    return true
  } else {
    return false
  }
}
const checkJA = (input) => {
  // Regular expression pattern
  const regex = /^JA-[a-zA-Z0-9]{20}$/
  if (regex.test(input)) {
    return true
  } else {
    return false
  }
}

const validate = (e) => {
  if (searchFunction === 0) {
    if (checkEval(search.value)) {
      find.classList.remove('disabled')
    } else {
      find.classList.add('disabled')
    }
  } else if (searchFunction === 1) {
    if (checkJA(search.value)) {
      find.classList.remove('disabled')
    } else {
      find.classList.add('disabled')
    }
  }
}
search.addEventListener('paste', validate, false)
search.addEventListener('keyup', validate, false)

find.addEventListener('click', function () {
  if (find.classList.contains('disabled')) { /* empty */ } else {
    if (searchFunction === 0) {
      evalToken = search.value
      const evalLink = 'https://opensearch.alloy.sdm.network/_dashboards/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-3M,to:now))&_a=(columns:!(module,msg),filters:!(),index:aacac0b0-b114-11ed-9c20-5b437ab849c3,interval:auto,query:(language:kuery,query:%22' + evalToken + "%22),sort:!(!('@timestamp',asc)))"
      window.open(evalLink, '_blank').focus()
    } else {
      jaToken = search.value
      const jaLink = 'https://opensearch.alloy.sdm.network/_dashboards/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-3M,to:now))&_a=(columns:!(module,msg),filters:!(),index:aacac0b0-b114-11ed-9c20-5b437ab849c3,interval:auto,query:(language:kuery,query:%22' + jaToken + "%22),sort:!(!('@timestamp',asc)))"
      window.open(jaLink, '_blank').focus()
    }
  }
})
/*
git.addEventListener('click',function(){
    window.open("https://github.com/Austinj0/CS-Chrome-Extension", "_blank").focus();
})
*/
const removeActive = () => {
  uiButtons.forEach(u => {
    u.classList.remove('active')
  })
}
uiButtons.forEach(button => {
  button.addEventListener('click', function (e) {
    const target = e.target.closest("[data-panel]");
    if (!target) {
      console.log("Error: UI Element Not Found");
      return;
    }

    const targetPanel = target.dataset.panel;
    const panels = {
      'settings': settings,
      'accountDetails': accountDetails,
      'SDK': SDK
    };

    closePanels();

    if (target.classList.contains('active')) {
      target.classList.toggle('active');
    } else if (panels[targetPanel]) {
      removeActive();
      target.classList.toggle('active');
      panels[targetPanel].classList.toggle('hidden');
    } else {
      console.log("Error: UI Element Not Found");
    }
  });
});

const closePanels = () => {
  panels.forEach(p => {
    p.classList.add('hidden');
  })
}
for(let i = 0; i < closePanel.length; i++) {
  closePanel[i].addEventListener('click', function () {
    removeActive();
    closePanels();
  })
}

function getCookies (AlloyCookies, callback) {
  // eslint-disable-next-line no-undef
  chrome.cookies.getAll(AlloyCookies, function (cookie) {
    if (callback) {
      callback(cookie)
    }
  })
}
function filterCookiesByName (entries, name) {
  // Filter the array for entries with the specified name
  const filteredEntries = entries.filter(entry => entry.name === name)
  // If no matching entry found, return null or handle accordingly
  if (filteredEntries.length === 0) {
    return null // or return undefined, throw an error, etc.
  }
  // Return the value of the first matching entry
  return filteredEntries[0].value
}
const setAlloyData = (data) => {
  const agentName = filterCookiesByName(data, 'agent_name')
  const agentEmail = filterCookiesByName(data, 'agent_email')
  agentEmailUI.innerText = agentEmail
  agentNameUI.innerText = agentName
}

getCookies({ domain: '.app.alloy.co' }, function (data) {
  setAlloyData(data)
})
// eslint-disable-next-line no-undef
chrome.storage.local.get('feature_flags', function (items) {
  const allFF = JSON.parse(items.feature_flags)
  console.log(allFF)
  const ffList = document.querySelector('#ff_list')
  const activeFF = Object.entries(allFF).filter(([key, value]) => value === true)
  activeFF.forEach(function(ff) {
    const ffItem = document.createElement('li')
    ffItem.classList.add('ff_active')
    console.log(ff)
    ffItem.innerText = ff[0]
    const span = document.createElement('span')
    span.innerText = 'Active'
    ffItem.appendChild(span)
    ffList.appendChild(ffItem)
  })
})
