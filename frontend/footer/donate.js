const footerDiv = document.getElementById('footer-div')

// TODO: count the number of times the user clicks the boton extention
// and display the Donate botom
let myUsage = 0

// awaits for initStorageCache to be set before executing logic
async function displayBtn() {
  const len = await initStorageCache
  if (myLeads.length >= 6) {
    footerDiv.classList.remove('hidden');
  }
}

displayBtn()

// const donateBtn = document.getElementById('donate-btn')
// donateBtn.addEventListener("click", function () {
//     chrome.tabs.create({
//         url: 'https://paypal.me/NandoDev?locale.x=en_US'
//     })
// })
