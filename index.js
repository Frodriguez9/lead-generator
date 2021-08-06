// TODO: refactor - build a function that implements the localStorage.setItem()
let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = localStorage.getItem("myLeads")

// leadsFromLocalStorage is undifined when the extension has never bend used
if (leadsFromLocalStorage) {
  myLeads = JSON.parse(leadsFromLocalStorage)
  render(myLeads)
}


function render(leads){
  let listOfHTMLitems = ""
  for (let i=0; i < leads.length; i++) {
    listOfHTMLitems += `
            <li>
                <a href="${leads[i]}" target="_blank">
                  ${leads[i]}
                </a>
            </li>`
  };
    ulEl.innerHTML = listOfHTMLitems;
}

// chrome.tabs.query()
//    active:true indicates to the chrome api we are looking at the current tab
//    currentWindow:true indicates chrome api we are looking at the
//                       currentWindow, as we can have multiple windows open

tabBtn.addEventListener("click", function(){
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  });
});


deleteBtn.addEventListener("dblclick", function() {
  localStorage.clear();
  myLeads = []
  render(myLeads)
})


inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
  inputEl.value = ""
});
