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
  // filters out repeated numbers that can be hidden in the DOM
  if (phones.result) {
    newLead.phones = phones.result.filter((phone, index, arr) => {
      const uniquePhone = (phone !== arr[index+1])? phone : null
      return uniquePhone
    })
  }

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
  const phoneRegEx = /\(?([2-9][0-8][0-9])\)?[\s-\.]([2-9][0-9]{2})[\s-\.]([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/g
  const body = document.body.innerHTML
  return body.match(phoneRegEx)
}
