let currentPage = 1;
let per = 12;

var header = document.createElement("div");
header.setAttribute("class", "header");
header.innerHTML = "<p><b>Open BREWERY API<b></p>";
var sidenav = document.createElement("div");
sidenav.setAttribute("class", "sidenav");
sidenav.innerText = "BREWERY API DATA'S"

var footer = document.createElement("div");
footer.setAttribute("class", "footer");
footer.innerHTML = `
<p id="currentPage"></p>
<button type="button" onclick="previous()">Previous</button>
<button onclick="next()">Next</button>`
var section = document.createElement("section");
section.setAttribute("class", "section")
document.body.append(header, sidenav, footer, section);

function createData({ name, brewery_type, street, city, state, postal_code, country, website_url, phone}) {
    var container = document.createElement("div");
    container.setAttribute("class", "container");
    container.innerHTML = `
<p>NAME       :    ${name}</p>
<p>TYPE       :   ${brewery_type}</p>
<p>ADDRESS    :  <br> 
STREET:   ${street}</p>
<p>CITY       :   ${city}</p>
<p>STATE      :   ${state}</p>
<p>POSTAL CODE: ${postal_code}</p>
<p>COUNTRY    : ${country}<p>
<p>WEBSITE    : ${website_url}</P>
<p>PHONE NO   :   ${phone}</p>`
    section.appendChild(container);
}

async function per_page(num) {
    document.querySelector(".box").innerHTML = ``;
    try {
        let data = await fetch(`https://api.openbrewerydb.org/breweries?per_page=${num}`);
        let info = await data.json();
        console.log(info);
        info.forEach((brewery) => createData(brewery));
    }
    catch (error) {
        console.error(error);
    }

}

page(1);

async function page(num) {
    document.querySelector(".section").innerHTML = ``;
    document.querySelector("#currentPage").innerHTML = `Page: ${num}`


    try {
        let data = await fetch(`https://api.openbrewerydb.org/breweries?per_page=${per}&page=${num}`);
        let info = await data.json();
        console.log(info);
        info.forEach((brewery) => createData(brewery));
    }
    catch (error) {
        console.error(error);
    }
    currentPage = num;
}


function previous() {
    let a = currentPage - 1;
    if (a < 1) {
        page(1);
    }
    else {
        page(a);
    }
}

function next() {
    let b = currentPage + 1;
    page(b);
}