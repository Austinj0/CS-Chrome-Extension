const search = document.querySelector('#search')
const find = document.querySelector('#submit')
const switches = document.querySelectorAll('.switch-input')
// const git = document.querySelector(".git");
const uiButtons = document.querySelectorAll('.circle')
const accountDetails = document.querySelector('#accountDetails')
const closeAccountDetails = document.querySelector('#closeAccountDetails')
const agentEmailUI = document.querySelector('#agentEmail')
const agentNameUI = document.querySelector('#agentName')
console.log(closeAccountDetails)
const openAccountDetails = document.querySelector('#openAccountDetails')
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
for (let i = 0; i < uiButtons.length; i++) {
  uiButtons[i].addEventListener('click', function () {
    uiButtons[i].classList.toggle('active')
  })
}

openAccountDetails.addEventListener('click', function () {
  accountDetails.classList.toggle('hidden')
  openAccountDetails.classList.toggle('active')
})
closeAccountDetails.addEventListener('click', function () {
  accountDetails.classList.toggle('hidden')
  openAccountDetails.classList.toggle('active')
})

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
