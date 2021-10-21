const urlInput = document.getElementById("input-url")
const phonesInput = document.getElementById("input-phones")
const inputBtn = document.getElementById("input-btn")

inputBtn.addEventListener("click", function() {
  newLead.hostName = urlInput.value
  newLead.hostName = urlInput.value
  newLead.phones = phonesInput.value.split(",")
  myLeads.unshift(newLead)
  render(myLeads)
  chrome.storage.sync.set({leads:myLeads}, function() {
  //console.log(myLeads)
  })
  urlInput.value = ""
  phonesInput.value = ""
  newLead = resetLead()
});
