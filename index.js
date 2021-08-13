
let myLeads = []
let newLead = {  // used across bottons
  href:null,
  hostName:null,
  phones:null // set to an array when assigned
}

/*
  resetNewLead()
      A helper function to reset newLead
*/
function resetLead(){
  return {
    href:null,
    hostName:null,
    phones:null
  }
}


const ulEl = document.getElementById("ul-el")

// Where we will expose all the data we retrieve from storage.sync.
let leadsFromSyncStorage = {};
// Asynchronously retrieve data from storage.sync, then cache it.
const initStorageCache = getAllStorageSyncData().then(items => {
  // Copy the data retrieved from storage into leadsFromSyncStorage.
  Object.assign(leadsFromSyncStorage, items);

  // leadsFromLocalStorage is undifined when the extension has never bend used
  if (leadsFromSyncStorage.leads) {
    myLeads = leadsFromSyncStorage.leads
    render(myLeads)
  }

});



// makes logic waits to execute until the data have been fecth from
// storage.sync
chrome.action.onClicked.addListener(async (tab) => {
  try {
    await initStorageCache;
  } catch (e) {
    // Handle error that occurred during storage initialization.
    console.log(e)
  }
  // Normal action handler logic.
});

// Reads all data out of storage.sync and exposes it via a promise.
//
// Note: Once the Storage API gains promise support, this function
// can be greatly simplified.
function getAllStorageSyncData() {
  // Immediately return a promise and start asynchronous work
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.sync.
    chrome.storage.sync.get("leads", (items) => {
      // Pass any observed errors down the promise chain.
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      // Pass the data retrieved from storage down the promise chain.
      resolve(items);
    });
  });
}


function render(leads){
  let listOfHTMLitems = ""
  for (let i=0; i < leads.length; i++) {
    const href = (leads[i].href)? leads[i].href : ''
    const hostName = (leads[i].hostName)? leads[i].hostName : ''
    const phones = (leads[i].phones)? leads[i].phones.result : ''

    listOfHTMLitems += `
            <li>
                <a href="${href}" target="_blank">
                  ${hostName}
                </a>${phones}
            </li>`
  };
    ulEl.innerHTML = listOfHTMLitems;
}

//console.log(leadsFromSyncStorage)
