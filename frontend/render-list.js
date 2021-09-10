const contactListDivEl = document.getElementById("contact-list-div")

function render(leads){
  let listOfHTMLitems = ""
  for (let i=0; i < leads.length; i++) {
    const href = (leads[i].href)? leads[i].href : ''
    const hostName = (leads[i].hostName)? leads[i].hostName : ''
    const phones = (leads[i].phones)? leads[i].phones: ''

    let listOfPhones = ``
    if (phones !== ''){
      phones.forEach(phone => listOfPhones += `<li><a href="tel:${phone}" target="_blank">${phone}</a></li>`)
    }

    const ul = (i%2 === 0)? '<ul class="bg-light" id="ul-el">' : '<ul id="ul-el">'

    listOfHTMLitems += `
          ${ul}
            <li>
                <a href="${href}" target="_blank">${hostName}</a>
                <ul>
                ${listOfPhones}
                </ul>
            </li>
          </ul>`
  };
    contactListDivEl.innerHTML = listOfHTMLitems;
}
