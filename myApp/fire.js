import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import {} from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCsMvQbILIZxJAB4yno-5LBoFpwpNSByCM",
    authDomain: "reviewio-1e433.firebaseapp.com",
    projectId: "reviewio-1e433",
    storageBucket: "reviewio-1e433.firebasestorage.app",
    messagingSenderId: "328743391235",
    appId: "1:328743391235:web:5bf56f6ae2632414c0fe36",
    measurementId: "G-7N1P0VBZMC"
}
const app = initializeApp(config)

const appcheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider("6Ldcm7kqAAAAADinqn5RMpYN_hidjb7ULns7p5Mi"), 
    isTokenAutoRefreshEnabled: true
})

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
    if(user === null){
        signInAnonymously(auth)
    }else{
        console.log("user logged in")
    }
})