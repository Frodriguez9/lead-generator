let myLeads = []
let newLead = {  // used across bottons
  href:null,
  hostName:null,
  phones:[],
  emails:[]
}

/*
  resetNewLead()
      A helper function to reset newLead
*/
function resetLead(){
  return {
    href:null,
    hostName:null,
    phones:[],
    emails:[]
  }
}


// Where we will expose all the data we retrieve from storage.sync.
let leadsFromSyncStorage = {}

// Asynchronously retrieve data from storage.sync, then cache it.
const initStorageCache = getAllStorageSyncData().then(items => {
  // Copy the data retrieved from storage into leadsFromSyncStorage.
  Object.assign(leadsFromSyncStorage, items)

  // leadsFromLocalStorage is undifined when the extension has never bend used
  if (leadsFromSyncStorage.leads) {
    myLeads = leadsFromSyncStorage.leads
    render(myLeads)
  }

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
        return reject(chrome.runtime.lastError)
      }
      // Pass the data retrieved from storage down the promise chain.
      resolve(items);
    })
  })
}
