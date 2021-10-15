const leadsTable = document.getElementById("contact-list-div")

function render(leads){
  let listOfHTMLitems = ` <tr class="table-row-head">
                            <th>Website</th>
                            <th>Phones</th>
                          </tr>`

  for (let i=0; i < leads.length; i++) {
    const href = (leads[i].href)? leads[i].href : ''
    const hostName = (leads[i].hostName)? leads[i].hostName : ''
    const phones = (leads[i].phones)? leads[i].phones: ''

    let listOfPhones = ``
    if (phones !== ''){
      phones.forEach(phone => listOfPhones += `<a href="tel:${phone}" target="_blank">${phone}</a> <br>`)
    }


    listOfHTMLitems += `
          <tr>
            <td><a href="${href}" target="_blank">${hostName}</a></td>
            <td>${listOfPhones}</td>
          </tr>
        `
  };
    leadsTable.innerHTML = listOfHTMLitems;
}
