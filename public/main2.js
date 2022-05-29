// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getDatabase, ref, onValue, set, remove} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4GK3AUTuiHswMSB-qCaoZbdT3bZbwGrc",
  authDomain: "spectra-phy.firebaseapp.com",
  databaseURL: "https://spectra-phy-default-rtdb.firebaseio.com",
  projectId: "spectra-phy",
  storageBucket: "spectra-phy.appspot.com",
  messagingSenderId: "218993301903",
  appId: "1:218993301903:web:ec2881b059668a87afd3fa",
  measurementId: "G-XGXF83N566"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Display table
document.addEventListener('DOMContentLoaded', () => {
    const db = getDatabase()
    try{
        const users = ref(db, 'users')
        onValue(users, (snapshot) => {
            let data = snapshot.val()
            const keys = Object.keys(data)
            data = Object.values(data)
            displayTable(keys, data)
        })
    }catch(err){
        displayTable([], [])
    }
    
})

function displayTable(keys, data){
    const table = document.querySelector("table tbody")
    
    if(data.length == 0 || (data.length == 1 && data[0] == '')){
        table.innerHTML = "<tr><td class = 'no-data' colspan='8'>No Data</td></tr>"
        return
    }

    let tableHtml = ""

    let isMobile = ('ontouchstart' in document.documentElement)
    
    if(!isMobile){
        document.querySelector("#delete-col").style.display = ''
    }

    for(let i = 0; i<data.length; i++){
        let d = data[i]
        if (d != ''){
            d.ID = keys[i]
            tableHtml += "</tr>";
            tableHtml += `<td>${d['DateTime']}</td>`
            tableHtml += `<td>${d['Name']}</td>`
            tableHtml += `<td>${d['College']}</td>`
            tableHtml += `<td>${d['Shift']}</td>`
            tableHtml += `<td>${d['contact']}</td>`
            tableHtml += `<td>${d['events']}</td>`
            if(!isMobile){
                tableHtml += `<td><button class="delete-row-btn" id=${d.ID}>X</td>`;
            }
            tableHtml += "</tr>";
        }
        
    }
    
    table.innerHTML = tableHtml

}


// Delete a row
document.querySelector("table tbody").addEventListener("click", function(event){
    if(event.target.className === "delete-row-btn"){
        const DeleteSure = window.confirm("Do you want to delete this entry?")
        console.log(DeleteSure)
        if(DeleteSure){
            deleteRow(event.target.id)
        }
    }
}, false)

function deleteRow(id){
    const db = getDatabase()
    const users = ref(db, 'users')
    onValue(users, (snapshot) => {
        let data = snapshot.val()
        data = Object.values(data)
        console.log(data.length)
        if(data.length == 1){
            set(ref(db, 'users/' + 0), '')
        }
    })
    remove(ref(db, 'users/'+id))
    .then(() => alert("Data successfully removed"))
    .catch(() => alert("Removal of data was unsuccessful"))
}