const switch1 = document.getElementById('switch1');
const circle1 = document.getElementById('circle1');
const switch2 = document.getElementById('switch2');
const circle2 = document.getElementById('circle2');
let tabId = null; // To store the tab ID where the script was injected.

// Function to load isEnabled from storage and update the switch state
chrome.storage.sync.get('isEnabled1', ({ isEnabled1 }) => {
    if (isEnabled1) {
        turnOnSwitch(switch1, circle1);
    }
});

chrome.storage.sync.get('isEnabled2', ({ isEnabled2 }) => {
    if (isEnabled2) {
        turnOnSwitch(switch2, circle2);
    }
});

async function handleSwitch1Click() {
    const { isEnabled1 } = await new Promise((resolve) => {
        chrome.storage.sync.get('isEnabled1', (data) => resolve(data));
    });

    const activeTabs = await new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => resolve(tabs));
    });

    const currentUrl = activeTabs[0]?.url || '';

    if (!currentUrl.includes("https://codeforces.com/")) {
        return;
    }

    if (!isEnabled1) {
        const { isEnabled2 } = await new Promise((resolve) => {
            chrome.storage.sync.get('isEnabled2', (data) => resolve(data));
        });

        if (isEnabled2) {
            turnOffSwitch(switch2, circle2);
            chrome.storage.sync.set({ isEnabled2: false });
            chrome.scripting.executeScript({
                target: { tabId: activeTabs[0].id, allFrames: true },
                function: removeScript2,
            });
        }

        turnOnSwitch(switch1, circle1);
        chrome.storage.sync.set({ isEnabled1: true });
        chrome.scripting.executeScript({
            target: { tabId: activeTabs[0].id, allFrames: true },
            function: injectScript1,
        });
    } else {
        turnOffSwitch(switch1, circle1);
        chrome.storage.sync.set({ isEnabled1: false });
        chrome.scripting.executeScript({
            target: { tabId: activeTabs[0].id, allFrames: true },
            function: removeScript1,
        });
    }
}

async function handleSwitch2Click() {
    const { isEnabled2 } = await new Promise((resolve) => {
        chrome.storage.sync.get('isEnabled2', (data) => resolve(data));
    });

    const activeTabs = await new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => resolve(tabs));
    });

    const currentUrl = activeTabs[0]?.url || '';

    if (!currentUrl.includes("https://codeforces.com/")) {
        return;
    }

    if (!isEnabled2) {
        const { isEnabled1 } = await new Promise((resolve) => {
            chrome.storage.sync.get('isEnabled1', (data) => resolve(data));
        });

        if (isEnabled1) {
            turnOffSwitch(switch1, circle1);
            chrome.storage.sync.set({ isEnabled1: false });
            chrome.scripting.executeScript({
                target: { tabId: activeTabs[0].id, allFrames: true },
                function: removeScript1,
            });
        }

        turnOnSwitch(switch2, circle2);
        chrome.storage.sync.set({ isEnabled2: true });
        chrome.scripting.executeScript({
            target: { tabId: activeTabs[0].id, allFrames: true },
            function: injectScript2,
        });
    } else {
        turnOffSwitch(switch2, circle2);
        chrome.storage.sync.set({ isEnabled2: false });
        chrome.scripting.executeScript({
            target: { tabId: activeTabs[0].id, allFrames: true },
            function: removeScript2,
        });
    }
}

switch1.addEventListener('click', handleSwitch1Click);
switch2.addEventListener('click', handleSwitch2Click);

function turnOnSwitch(Switch, circle) {
    circle.style.animation = "moveCircleRight .15s ease-in-out 0s forwards";
}

function turnOffSwitch(Switch, circle) {
    circle.style.animation = "moveCircleLeft .15s ease-in-out 0s forwards";
}


function injectScript1() {
    const imgElement = document.querySelectorAll("img");

    // Apply CSS styles to the image element
    for (const i of imgElement) {
        i.style.mixBlendMode = "multiply";
        i.style.filter = "contrast(1)";
    }

    // Apply styles to the body element
    document.body.style.backgroundColor = "#d3d3a0d1";

    // Select all elements with class "dark" inside elements with class "roundbox"
    const darkElements = document.querySelectorAll(".roundbox, .dark, table");

    // Apply styles to the selected elements
    for (const darkElement of darkElements) {
      darkElement.style.backgroundColor = "beige";
    }
}

function removeScript1() {
    const imgElement = document.querySelectorAll("img");

    // Remove CSS styles from the image element
    for (const i of imgElement) {
      i.style.mixBlendMode = "";
      i.style.filter = "";
    }

    // Remove styles from the body element
    document.body.style.backgroundColor = "";

    // Select all elements with class "dark" inside elements with class "roundbox"
    const darkElements = document.querySelectorAll(".roundbox, .dark, table");

    // Remove styles from the selected elements
    for (const darkElement of darkElements) {
      darkElement.style.backgroundColor = "";
    }
}

function injectScript2() {
    // Apply styles to the body element
    var text = document.querySelectorAll("p, h1, h2, h3, span, li, .info, .header")
    for (const i of text) {
        i.style.color = "white";
    }
    document.body.style.backgroundColor = "#121317ed";

    // Select all elements with class "dark" inside elements with class "roundbox"
    const darkElements = document.querySelectorAll(".roundbox, .dark, table, .bottom-links");

    // Apply styles to the selected elements
    for (const darkElement of darkElements) {
        darkElement.style.backgroundColor = "#121317";
        darkElement.style.color = "white";
    }

    document.getElementById("footer").style.color = "white"

    // css for anchor tags
    var anc = document.querySelectorAll('a')
    for(const it of anc){ 
        if(it.className.includes("rated-user")){
            continue;
        } else{
            it.style.color = "white"
        }
    }
}
function removeScript2() {
    // Apply styles to the body element
    var text = document.querySelectorAll("p, h1, h2, h3, span, li, .info, .header")
    for (const i of text) {
        i.style.color = "";
    }
    document.body.style.backgroundColor = "";

    // Select all elements with class "dark" inside elements with class "roundbox"
    const darkElements = document.querySelectorAll(".roundbox, .dark, table, .bottom-links");

    // Apply styles to the selected elements
    for (const darkElement of darkElements) {
      darkElement.style.backgroundColor = "";
      darkElement.style.color = "";
    }
    
    document.getElementById("footer").style.color = ""

    // css for anchor tags
    var anc = document.querySelectorAll('a')
    for(const it of anc){ 
        if(it.className.includes("rated-user")){
            continue;
        } else{
            it.style.color = ""
        }
    }


}