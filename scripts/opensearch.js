let beautyState = true;
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}
const beautify = () => {
  if(getCookie('prettyPrint') === 'false') {
    beautyState = false;
} else {beautyState = true 
}
  if (beautyState) {
    const logs = document.querySelectorAll("[data-test-subj='tableDocViewRow-log-value']:not([data-formatted])")
    try {
      for (let i = 0; i < logs.length; i++) {

        try {
          let logJson = JSON.parse(logs[i].innerText)
          if (logJson.hasOwnProperty("encrypted_log")) {
            const uuid = crypto.randomUUID();
            logJson["usage"] = "To decrypt please follow this link https://app.alloy.co/v3/dashboard/admin/decrypt?key=" + uuid
            logJson["decryption_url"] = "https://app.alloy.co/v3/dashboard/admin/decrypt?key=" + uuid
            const decrypt = {
              [uuid] : logJson["encrypted_log"]
            }
          const currentLogs = getCookie("logs")
          let logstore;
          if(typeof currentLogs === 'object' && currentLogs !== null) {
            const mergedObject = Object.assign({}, currentLogs, decrypt);
            logstore = mergedObject;
          } else {
            logstore = decrypt
          }
          console.log(logJson)
          document.cookie = 'logs=' + logstore + ';expires=Thu, 07 May 2025 12:00:00 UTC;domain=opensearch.alloy.sdm.network;path=/'
          chrome.storage.local.set({logs: logstore}, function () { 
        });
        }
          // eslint-disable-next-line no-undef
        logs[i].innerHTML = prettyPrintJson.toHtml(logJson)
        logs[i].dataset.formatted = 'formatted';
        }
        catch(e){
          console.log(e)
          console.log(logs[i].innerText);
          beautifyState = false;
        }
        
        
      }
    } catch(e) {console.log(e) }
  }
  setTimeout(beautify, 500)
}
// this might be redundant should probably remove 
const toggleBeauty = () => {
  if (beautyState) {
    beautyState = false
  } else {
    beautyState = true
    beautify()
  }
}

window.addEventListener('load', function () {
  beautify()
})