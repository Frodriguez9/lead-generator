const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const phoneRegEx = /(?:\d{3}|\(\d{3}\))([-\/\.\n])\d{3}\1\d{4}/g

inputBtn.addEventListener("click", function() {
  newLead.hostName = "(Input)" + inputEl.value
  myLeads.push(newLead)
  render(myLeads)
  chrome.storage.sync.set({leads:myLeads}, function() {
  //console.log(myLeads)
  })
  inputEl.value = ""
  newLead = resetLead()
});
