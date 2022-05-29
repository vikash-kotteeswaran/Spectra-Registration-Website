// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getDatabase, ref, onValue, remove} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js"; 
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

//Match login credentials and go to admin page
function Login(){
    const uname = document.querySelector('input#uname').value.trim()
    const psw = document.querySelector('input#psw').value

    if (uname != '' && psw != ''){
        try{
            const db = getDatabase()
            const admin = ref(db, 'admins/'+ uname)
            onValue(admin, (snapshot) => {
                let passwrd = snapshot.val()
                passwrd = Object.values(passwrd)[0]
                if(psw == passwrd){
                    window.location.href = 'admin.html'
                    console.log('login successful')
                } else{
                    document.getElementById('incorrect-login').textContent = 'Incorrect password'
                    document.getElementById('incorrect-login').style.display = 'block'
                }
            })
        }catch(err){
            document.getElementById('incorrect-login').textContent = 'Incorrect username'
            document.getElementById('incorrect-login').style.display = 'block'
        }
    }

}


document.getElementById("log-sub").addEventListener("click", Login, false)