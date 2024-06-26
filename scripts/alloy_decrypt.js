window.addEventListener('load', function () {
    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }
    
            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });
    
            // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    
    if(urlParams.has('key')){
        const key = urlParams.get('key')
        chrome.storage.local.get("logs", function (value) { 
            if(value.logs[key] != null && value.logs[key]!= "") {
                waitForElm('#cl-input-1').then((textarea) => {
                    
                    console.log(textarea)
                    textarea.blur()
                    textarea.value=value.logs[key]
                        const event = new Event('change',{ 'bubbles': true });
                        const event2 = new Event('click',{ 'bubbles': true });
                        textarea.dispatchEvent(event);
                        window.setTimeout(function() {
        
                                const button = document.querySelector(".sc-bZTaUC "); const event2 = new Event('click',{ 'bubbles': true });
                                button.dispatchEvent(event2)
                   
                          }, 500 /* but after 400 ms */);
                        
                })
                
            }
        } );
        
    }
  })