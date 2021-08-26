const footerDiv = document.getElementById('footer-div')
const donateBtn = document.getElementById('donate-btn')

// TODO: count the number of times the user clicks the boton extention
// and display the Donate botom
let myUsage = 0

// awaits for initStorageCache to be set before executing logic
async function displayBtn() {
  const len = await initStorageCache
  if (myLeads.length >= 6) {
    footerDiv.classList.toggle('visible');
  } else {
    footerDiv.classList.toggle('hidden');
  }
}

displayBtn()

donateBtn.addEventListener("click", function () {
    chrome.tabs.create({
        url: 'https://paypal.me/NandoDev?locale.x=en_US'
    })
})
