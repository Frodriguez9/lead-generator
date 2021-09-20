const tabBtn = document.getElementById("tab-btn")
const phoneRegEx = '\\(?([2-9][0-8][0-9])\\)?[\\s-\\.]([2-9][0-9]{2})[\\s-\\.]([0-9]{4})(?:\\s*(?:#|x\\.?|ext\\.?|extension)\\s*(\\d+))?'
const emailRegEx = '\\w+([\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+'
const phonePath = '//text()'
const emailPath = '//*[text()[string-length(normalize-space(.))>0 and contains(.,"@")]]'  //"//text()[contains(.,'@')]"


// new grabMatches

// function grabMatches(regex, xpath) {
//   // we construct the RegEx here because the arguments in chrome.scripting.executeScript()
//   // must be of type string, number, boolean, null, array/object that consists
//   // of the mentioned types. Passing the RegEx as '/ab+c/' format won't work
//   const re = new RegExp(regex, 'g')
//   let matches = []
//
//   function trim(str) {
//     return str.replace(/^\s+|\s+$/g,'')
//   }
//
//   function extractText(element) {
//     var text = ''
//     for ( var i = 0; i < element.childNodes.length; i++) {
//       if (element.childNodes[i].nodeType === Node.TEXT_NODE) {
//         nodeText = trim(element.childNodes[i].textContent)
//
//         if (nodeText) {
//           text += element.childNodes[i].textContent + ' '
//         }
//       }
//     }
//     return trim(text)
//   }
//
//   function selectElementsHavingTextByXPath(expression) {
//     result = document.evaluate(expression, document.body, null,
//              XPathResult.ANY_TYPE, null)
//
//     var nodesWithText = new Array()
//
//     var node = result.iterateNext()
//     while (node) {
//       if (extractText(node)) {
//         nodesWithText.push(node)
//       }
//
//       node = result.iterateNext()
//     }
//
//     return nodesWithText
//   }
//
//   console.log(selectElementsHavingTextByXPath(xpath))
//
//   return matches
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



// function grabMatches(regex) {
//   // we construct the RegEx here because the arguments in chrome.scripting.executeScript()
//   // must be of type string, number, boolean, null, array/object that consists
//   // of the mentioned types. Passing the RegEx as '/ab+c/' format won't work
//   const re = new RegExp(regex, 'g')
//   let matches = []
//
//   //  ps is an array-like object.
//   //  In order to iterate over its items, you have to call indirectly forEach()
//   //  using the Array.from().
//   const ps = document.getElementsByTagName('address')
//   Array.from(ps).forEach(matchRegEx)
//
//   return matches
//
//   function matchRegEx(item) {
//     let myMatch = item.innerText.match(re)
//     // myMatch is an array
//     if (myMatch) {
//       for (let i=0; i < myMatch.length; i++) {
//         matches.push(myMatch[i])
//
//       }
//     }
//   }
// }


// Not to lose
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
