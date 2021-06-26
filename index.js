let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")

localStorage.clear()
localStorage.setItem("idCounter", "0")
//console.log(localStorage.length)
localStorage.clear()
inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value);
  inputEl.value = '';
  renderLeads()
});



function renderLeads(){
  let listOfHTMLitems = ""
  for (let i=0; i < myLeads.length; i++) {
    listOfHTMLitems += `
            <li>
                <a href="${myLeads[i]} target="_blank">
                  ${myLeads[i]}
                </a>
            </li>`
  };
    ulEl.innerHTML = listOfHTMLitems
}
