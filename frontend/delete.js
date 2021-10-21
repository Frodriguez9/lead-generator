const deleteBtn = document.getElementById("delete-btn")
const overlayDelete = document.getElementById("overlay-delete")
const modalDeleteCancelBtn = document.getElementById("modal-delete-cancel")
const modalDeleteDeleteBtn = document.getElementById("modal-delete-delete")

deleteBtn.addEventListener("click", function(){
    overlayDelete.classList.remove("hidden")
})

modalDeleteCancelBtn.addEventListener("click", function(){
  overlayDelete.classList.add("hidden")
})

modalDeleteDeleteBtn.addEventListener("click", function() {
  chrome.storage.sync.clear();
  myLeads = []
  render(myLeads)
  overlayDelete.classList.add("hidden")

})
