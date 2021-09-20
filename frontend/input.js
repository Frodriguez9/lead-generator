const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")

inputBtn.addEventListener("click", function() {
  newLead.hostName = "Input note: " + inputEl.value
  myLeads.unshift(newLead)
  render(myLeads)
  chrome.storage.sync.set({leads:myLeads}, function() {
  //console.log(myLeads)
  })
  inputEl.value = ""
  newLead = resetLead()
});
