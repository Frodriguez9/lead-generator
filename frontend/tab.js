const tabBtn = document.getElementById("tab-btn")
const phoneRegEx = '\\(?([2-9][0-8][0-9])\\)?[\\s-\\.]([2-9][0-9]{2})[\\s-\\.]([0-9]{4})(?:\\s*(?:#|x\\.?|ext\\.?|extension)\\s*(\\d+))?'
const emailRegEx = '\\w+([\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+'
const phonePath = '//text()'
const emailPath = "//*[contains(text(),'@')]"


// async function grabMatches(regex, xpath) {
//   // we construct the RegEx here because the arguments in chrome.scripting.executeScript()
//   // must be of type string, number, boolean, null, array/object that consists
//   // of the mentioned types. Passing the RegEx as '/ab+c/' format won't work
//   const re = new RegExp(regex, 'g')
//   let results = []
//
//   const xpathResults = document.evaluate(xpath, document.body, null, XPathResult.ANY_TYPE, null)
//   let thisNode = xpathResults.iterateNext();
//   let potencialNodes = []
//
//   // filter out nodes of <style> tag as we know phones and emails
//   // are not listed there
//   while (thisNode) {
//     const nodeName = thisNode.nodeName.toLowerCase()
//     if (nodeName !== 'style'){
//       potencialNodes.push(thisNode)
//     }
//     thisNode = xpathResults.iterateNext()
//   }
//
//   const checkMatches = (node, regex) => {
//     return new Promise((resolve, reject)=> {
//       console.log("1", node)
//       const matches = node.textContent.match(regex)
//       if (matches.length === 0) {
//         resolve(false)
//       } else {
//         const uniqueMatches = matches.filter((v, i, matches)=> {
//           return matches.indexOf(v) === i })
//         resolve(uniqueMatches)
//       }
//     })
//   }
//
//   const asyncLoop = async (nodeList) => {
//     for (node of nodeList) {
//       const matches = await checkMatches(node, re)
//       if (matches) {
//         console.log("asyncLoop", matches)
//         for (match of matches) {
//           if (!results.includes(match)) {
//             results.push(match)
//           }
//         }
//       }
//     }
//
//   }
//
//   try {
//     asyncLoop(potencialNodes)
//     console.log("2", results)
//     return results
//   } catch(err) {
//     console.log(err)
//   }
//
//
// }




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

  // fecth phones
  let [phones] = await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: grabMatches,
    args: [phoneRegEx, phonePath],
  });
  // filters out repeated numbers that can be hidden in the DOM
  console.log("Phones at Tab:", phones)
  console.log(phones.result)
  if (phones.result) {
    newLead.phones = phones.result.filter((phone, index, arr) => {
      const uniquePhone = (phone !== arr[index+1])? phone : null
      return uniquePhone
    })
  }

  // fetch emails
  // let [emails] = await chrome.scripting.executeScript({
  //   target:{tabId: tab.id},
  //   func: grabMatches,
  //   args: [emailRegEx, emailPath],
  // });
  // // filters out repeated emails that can be hidden in the DOM
  // if (emails.result) {
  //   newLead.emails = emails.result.filter((email, index, arr) => {
  //     const uniqueEmail = (email !== arr[index+1])? email : null
  //     return uniqueEmail
  //   })
  // }

  myLeads.unshift(newLead)
  render(myLeads)
  chrome.storage.sync.set({leads:myLeads}, function() {
  //console.log(myLeads)
  });
  // reset newLead values for next entry
  // usful for same-session input saving
  newLead = resetLead()

})



// Wroking
function grabMatches(regex, xpath) {
  // we construct the RegEx here because the arguments in chrome.scripting.executeScript()
  // must be of type string, number, boolean, null, array/object that consists
  // of the mentioned types. Passing the RegEx as '/ab+c/' format won't work
  const re = new RegExp(regex, 'g')
  let matches = []

  const xpathResults = document.evaluate(xpath, document.body, null, XPathResult.ANY_TYPE, null)
  let thisNode = xpathResults.iterateNext();


  while (thisNode) {
    // if (thisElement.match(re)) {
      const myResult = thisNode.textContent.match(re)
      if (myResult) {
        for (i=0; i< myResult.length; i++) {
          matches.push(myResult[i])
        }
      }
      thisNode = xpathResults.iterateNext()
    }

    return matches
}
