const searchBox = document.getElementById("search-el")

searchBox.addEventListener("keyup", (e) => {
  let tds = leadsTable.querySelectorAll('tr')
  //note: descendets is an Array-like obeject
  //      leadsTable defined in render-list.js
  if (tds.length) {
    for (let i = 1; i < tds.length; i++){  // tds[0] = Table Headings (th) [Website, phone..]
      const tdText = tds[i].textContent.toLowerCase()
      const query = e.target.value.toLowerCase()
      if (tdText.includes(query)){
        tds[i].style.display = ""
      } else {
        tds[i].style.display = "none"
      }
    }
  }

})
