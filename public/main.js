// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js"; 
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

// Insert a row of input data on click
let onClick = function(){
    const nameInp = document.querySelector('#name')
    const name = nameInp.value.trim()

    const collegeNameInp = document.querySelector("input[id='collegeName']")
    const collegeName = collegeNameInp.value.trim()

    const shiftInp = document.querySelector("input[id='shift']")
    const shift = shiftInp.value.trim()

    const contactInp = document.querySelector("input[id='contact']")
    const contact = contactInp.value.toString()

    let events = [...document.querySelectorAll("input[name='events']:checked")]
    events = events.map(x => x.value)
    events = events.join(', ')

    // Put a universal date, the form of the date is changing from devices to devices
    const date = new Date()

    const ID = date.toLocaleString().replace(/[^0-9]+/gi,'') + date.getMilliseconds()

    if(Validate(name, nameInp, contact, contactInp, collegeName, collegeNameInp, shift, shiftInp, events) == 0){
        const db = getDatabase()

        set(ref(db, 'users/' + ID), {
            'DateTime': dateHelper(date),
            'Name': name,
            'College' : collegeName,
            'Shift': shift,
            'contact': contact,
            'events': events
        })
        .then((msg) => {
            console.log('success')
            document.querySelector('#submitted').style.display = 'block'
            document.querySelector('#submitted').style.boxShadow = '0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .5)'
            const header = document.querySelector('#SpectraReg')
            header.style.opacity = '0.65'
            header.style.pointerEvents = "none"
            const form_wrapper = document.querySelector('#form-wrapper')
            form_wrapper.style.opacity = '0.65'
            form_wrapper.style.pointerEvents = "none"
        })
        .catch((err) => {console.log('unsuccessfull')})
    }
}

document.getElementById("sub").addEventListener("click", onClick, false)


document.addEventListener("click", (event) => {
    if(window.getComputedStyle(document.querySelector('#submitted')).display == 'block'){
        const triggered = event.target;
        const submitted_div = document.querySelector('#submitted')
        const h3_submitted = document.querySelector('#h3-submitted')
        if(triggered != submitted_div && triggered != h3_submitted){
            submitted_div.style.display = 'none'
            document.querySelector("#form").reset();
            const header = document.querySelector('#SpectraReg')
            header.style.opacity = '0.8'
            header.style.pointerEvents = "auto"
            const form_wrapper = document.querySelector('#form-wrapper')
            form_wrapper.style.opacity = '0.9'
            form_wrapper.style.pointerEvents = "auto"
            form_wrapper.classList.remove('darken')
        }
    }
}, false)



let dateHelper = function(date){
    let dateFormatted = ''
    dateFormatted += date.toLocaleTimeString('en-US')
    dateFormatted+=', '
    dateFormatted += date.toLocaleDateString('en-US')

    return dateFormatted
}

let Validate = function(name, nameInp, contact, contactInp, collegeName, collegeNameInp, shift, shiftInp, events){
    let Invalids = 0;

    // checking the inputs
    if(name.replace(/[^A-Za-z_ ]+/gi, '') != name || name == ''){
        nameInp.value = ''
        nameInp.style.borderBottom = "3px solid red"//.setCustomValidity("I expect an e-mail, darling!");
        nameInp.classList.add('red')
        Invalids = 1

        setTimeout(function(){
            nameInp.style.borderBottom = "3px solid black"
            nameInp.classList.remove('red')
        },2000);

    } else {
        nameInp.style.borderBottom = "3px solid green"
        nameInp.classList.add('green')

        setTimeout(function(){
            nameInp.style.borderBottom = "3px solid black"
            nameInp.classList.remove('green')
        },2000);
    }

    if(collegeName.replace(/[^A-Za-z_ ]+/gi, '') != collegeName || collegeName ==''){
        collegeNameInp.value = ''
        collegeNameInp.style.borderBottom = "3px solid red"
        collegeNameInp.classList.add('red')
        Invalids = 1

        setTimeout(function(){
            collegeNameInp.style.borderBottom = "3px solid black"
            collegeNameInp.classList.remove('red')
        },2000);

    } else {
        collegeNameInp.style.borderBottom = "3px solid green"
        collegeNameInp.classList.add('green')

        setTimeout(function(){
            collegeNameInp.style.borderBottom = "3px solid black"
            collegeNameInp.classList.remove('green')
        },2000);
    }

    if(contact.length != 10 || contact == ''){
        contactInp.value = ''
        contactInp.style.borderBottom = "3px solid red"//.setCustomValidity("I expect an e-mail, darling!");
        contactInp.classList.add('red')
        Invalids = 1

        setTimeout(function(){
            contactInp.style.borderBottom = "3px solid black"
            contactInp.classList.remove('red')
        },2000);

    } else {
        contactInp.style.borderBottom = "3px solid green"
        contactInp.classList.add('green')

        setTimeout(function(){
            contactInp.style.borderBottom = "3px solid black"
            contactInp.classList.remove('green')
        },2000);
    }

    if(shift == ''){
        shiftInp.value = ''
        shiftInp.style.borderBottom = "3px solid red"//.setCustomValidity("I expect an e-mail, darling!");
        shiftInp.classList.add('red')
        Invalids = 1

        setTimeout(function(){
            shiftInp.style.borderBottom = "3px solid black"
            shiftInp.classList.remove('red')
        },2000);

    } else {
        shiftInp.style.borderBottom = "3px solid green"
        shiftInp.classList.add('green')

        setTimeout(function(){
            shiftInp.style.borderBottom = "3px solid black"
            shiftInp.classList.remove('green')
        },2000);
    }

    if(events.length == 0){
        const inputHeads = document.querySelector('#input-heads')
        inputHeads.style.color = 'red'
        Invalids = 1

        setTimeout(function(){
            inputHeads.style.color = '#020074'
        },2000);

    } else {
        const inputHeads = document.querySelector('#input-heads')
        inputHeads.style.color = 'green'

        setTimeout(function(){
            inputHeads.style.color = '#020074'
        },2000);
    }

    return Invalids;
}
