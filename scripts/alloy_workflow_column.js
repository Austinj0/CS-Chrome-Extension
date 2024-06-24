/* Add new column to journey view to show workflow token */
// https://api.alloy.co/journeys/J-tqD6RfkEwyLAvi4uTHDi/versions/1
const journeyWorkflows = {}
const jaCard = document.createElement('div')
jaCard.classList.add('ja-card')
jaCard.classList.add('hide')
document.body.appendChild(jaCard)
window.addEventListener('load', async function () {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  }
  const csrftoken = getCookie('csrftoken-corekube-prod')
  const journeys = await fetch('https://api.alloy.co/journeys/?sort=%7B%7D&filter=%7B%22is_archived%22%3Afalse%7D', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'x-csrftoken': csrftoken,
      'x-requested-with': 'XMLHttpRequest'
    },
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }).then(function (response) { return response.json() }).then(function (data) {
    const journeyTokens = data._embedded.map(obj => obj.journey_token)
    return journeyTokens
  })
  if (journeys.length > 0) {
    for (let i = 0; i < journeys.length; i++) {
      const workflows = await fetch('https://api.alloy.co/journeys/' + journeys[i], {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'x-csrftoken': csrftoken,
          'x-requested-with': 'XMLHttpRequest'
        },
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      }).then(function (response) { return response.json() }).then(function (data) {
        const activeVersion = data._embedded.active_version

        const workflowList = activeVersion
          ? activeVersion.nodes.filter(node => node.type === 'workflow' || node.type === 'step_up' || node.type === 'router')
            .map(({ config, name }) => ({ workflow_token: config.workflow_token, name }))
          : []
        return workflowList
      })
      journeyWorkflows[journeys[i]] = workflows
    }
    // console.log(findParentJourneys('KHS1D4NqPGzGqwmzbhmEvLDjGkVvF1TG', journeyWorkflows))
  }

  insertJourneys()
})

const findParentJourneys = (workflowToken, data) => {
  console.log(data)
  const matchingArrayNames = []
  for (const key in data) {
    const entries = data[key]
    for (const entry of entries) {
      if (entry.workflow_token === workflowToken) {
        matchingArrayNames.push(key)
        break // Exit loop if the token is found in this array
      }
    }
  }
  return matchingArrayNames
}

const insertJourneys = () => {
  const workflowsView = document.querySelectorAll('.token')
  const rows = document.querySelectorAll('tr.clickable')
  const workflowTokens = document.querySelectorAll('[data-clipboard-text]')
  for (let i = 0; i < rows.length; i++) {
    // rows[i].innerHTML += '<div class="ja-view-wrap"><svg class="icon ja-view"><use xlink:href="#alloy-nav-journeys"></use></svg><div class="ja-card"><p>J-PR7BJwxFCPkGiebHK0DT</p><p>J-CRf9zVnB9vnQGNXTWpMm</p></div></div>'
    rows[i].addEventListener('mouseenter', (event) => {
      const token = workflowTokens[i].getAttribute('data-clipboard-text')
      const parentJourneys = findParentJourneys(token, journeyWorkflows)
      if(parentJourneys.length > 0) {
        const loc = event.target.getBoundingClientRect()
        jaCard.style.top = loc.top + 15
        jaCard.classList.remove('hide')
        jaCard.replaceChildren()
        for (let i = 0; i < parentJourneys.length; i++) {
          const item = document.createElement('a')
          item.href = 'https://app.alloy.co/v3/dashboard/journeys/' + parentJourneys[i] + '/versions/'
          item.innerText = parentJourneys[i]
          jaCard.appendChild(item)
        }
      }
    })
    rows[i].addEventListener('mouseleave', (event) => {
      if (event.toElement !== jaCard) {
        jaCard.classList.add('hide')
      }
    })
  }
}
/*
<td><svg class="icon"><use xlink:href="#alloy-nav-journeys"></use></svg></td> */

// get journeys https://api.alloy.co/journeys/?sort=%7B%7D&filter=%7B%22is_archived%22%3Afalse%7D done
// workflows of each journey https://api.alloy.co/journeys/J-tqD6RfkEwyLAvi4uTHDi
// combine into object
/*
   {
    ja-dasd" : [
  { workflow_token: "token1", name: "Workflow 1" },
  { workflow_token: "token3", name: "Workflow 2" }
]
    ja-dasssd : [
        "asdssd",
        "asaaqqa"
    ]
   }
   function findArrayNames(data, searchString) {
    const arrayNames = [];
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key].includes(searchString)) {
                arrayNames.push(key);
            }
        }
    }
    return arrayNames;
}
*/
