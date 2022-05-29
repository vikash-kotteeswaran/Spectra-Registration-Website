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


document.addEventListener('DOMContentLoaded', () => {
    const db = getDatabase()
    try{
        const users = ref(db, 'users')
        onValue(users, (snapshot) => {
            let data = snapshot.val()
            const keys = Object.keys(data)
            data = Object.values(data)
            let events = splitEvents(data)

            for(let eve in events){
                displayTable(eve, events[eve])
            }
        })
    }catch(err){
        splitEvents([], [])
    }
    
})


function splitEvents(data){
    let Events = {"Photography": [], "Treasure hunt": [], "Paper Presentation": [], "Block and Tackle": [], 
                "Jerk's corner": [], "Potpourri": [], "Escape room": [], "Adzap": [], "Quiz": []}

    
    for(let d of data){
        if(d!=''){
            for(let eve in Events){
                
                if(d['events'].includes(eve) &&  !ArrObjMatcher(d['Name'], 'Name', Events[eve]) && !(d['College'].toLowerCase() == 'madras christian college' || d['College'].toLowerCase() == 'mcc')){
                    Events[eve].push(d)
                    console.log(d['Name'])
                }
            }
        }
    }

    console.log(Events)

    return Events

}

function ArrObjMatcher(value, key, arr){
    for(let d of arr){
        if(d[key].includes(value)){
            return true
        }
    }
}


function displayTable(event, data){
    const table = document.querySelector("table tbody")
    
    if(data.length == 0 || (data.length == 1 && data[0] == '')){
        table.innerHTML = "<tr><td class = 'no-data' colspan='8'>No Data</td></tr>"
        return
    }

    let tableHtml = table.innerHTML


    for(let d of data){
        if (d != ''){
            tableHtml += "</tr>";
            tableHtml += `<td>${event}</td>`
            tableHtml += `<td>${d['Name']}</td>`
            tableHtml += `<td>${d['College']}</td>`
            tableHtml += `<td>${d['Shift']}</td>`
            tableHtml += `<td>${d['contact']}</td>`
            tableHtml += "</tr>";
        }
        
    }
    
    table.innerHTML = tableHtml

}
