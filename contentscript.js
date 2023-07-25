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


chrome.storage.sync.get('isEnabled1', ({ isEnabled1 }) => {
    if(isEnabled1){
        injectScript1();
    }
});
chrome.storage.sync.get('isEnabled2', ({ isEnabled2 }) => {
    if(isEnabled2){
        injectScript2();
    }
});