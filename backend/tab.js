const tabBtn = document.getElementById("tab-btn")

// chrome.tabs.query()
//    active:true indicates to the chrome api we are looking at the current tab
//    currentWindow:true indicates chrome api we are looking at the
//                       currentWindow, as we can have multiple windows open

tabBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  try {
    const url = new URL(tab.url)
    newLead.href = url.href
    newLead.hostName = url.hostname
  } catch(error) {  // if lead is not a valid url but a user input
    console.log(error)
  }

  /*
  chrome.scripting.executeScript executes a
    script funtion in the tad's document
  */

  let [phones] = await chrome.scripting.executeScript({
    target:{tabId: tab.id},
    function: grabPhones,
  });

  newLead.phones = phones

  myLeads.push(newLead)
  render(myLeads)
  chrome.storage.sync.set({leads:myLeads}, function() {
  //console.log(myLeads)
  });
  // reset newLead values for next entry
  // usful for same-session input saving
  newLead = resetLead()

})


/*
  grabPhones()
    uses a RegEx to scam phones.
*/

function grabPhones() {
  const phoneRegEx = /(?:\d{3}|\(\d{3}\))([-\/\.\n])\d{3}\1\d{4}/g
  const body = document.body.innerHTML
  return body.match(phoneRegEx)
}
