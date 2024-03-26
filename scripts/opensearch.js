console.log("loaded")
const beauty_btn = document.createElement('div');
beauty_btn.classList += "inject_button";
beauty_btn.innerText = "Beautify"
document.querySelector("html").appendChild(beauty_btn);
let beauty_state = false;

const beautify = () => {
    if (beauty_state) {
        const logs = document.querySelectorAll("[data-test-subj='tableDocViewRow-log-value']:not(.formatted)");
        try {
            for (i = 0; i < logs.length; i++) {
                let log_json = JSON.parse(logs[i].innerText);
                logs[i].innerHTML = prettyPrintJson.toHtml(log_json)
                logs[i].classList.add("formatted");
            }
        }
        catch { }
        setTimeout(beautify, 1000);
    }
}

const toggleBeauty = () => {
    if (beauty_state) {
        beauty_state = false
    } else {
        beauty_state = true;
        beautify()
    }
}
beauty_btn.addEventListener('click', toggleBeauty);