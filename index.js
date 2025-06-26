
let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteEl = document.getElementById("delete-btn")

const saveEl = document.getElementById("save-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads()
}



saveEl.addEventListener("click", function() {
    

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads()    
    
    
    })


})



function renderLeads() {
    let listItems = " "
    for (let i = 0; i < myLeads.length; i++) 
    {
        listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'> ${myLeads[i]} </a>
            </li>
        ` 
    } 

    ulEl.innerHTML = listItems 
}



deleteEl.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    renderLeads()
})



inputBtn.addEventListener("click", function() {  
    myLeads.push(inputEl.value)
    inputEl.value = " "
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads()

})



