const deleteBtn = document.getElementById("delete-btn")

deleteBtn.addEventListener("dblclick", function() {
  chrome.storage.sync.clear();
  myLeads = []
  render(myLeads)
})
