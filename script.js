import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: //"paste your firebase database url here"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const toDoListInDB = ref(database, "toDoList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const toDoListEl = document.getElementById("to-do-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(toDoListInDB, inputValue)

    clearInputFieldEl()
})

onValue(toDoListInDB, function(snapshot) {
    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        cleartoDoListEl()

        for ( let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemTotoDoListEl(currentItem)
        }
    }
    else {
        toDoListEl.innerHTML = "Nothing to worry ... yet"
    }
})

function cleartoDoListEl() {
    toDoListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemTotoDoListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `toDoList/${itemID}`)

        remove(exactLocationOfItemInDB)
    })

    toDoListEl.append(newEl)
}
