import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD_y4-6H68ICgslbvf-NVQpJRe5Lo2JFxQ",
    authDomain: "giants-seo-boilerplate.firebaseapp.com",
    databaseURL: "https://giants-seo-boilerplate.firebaseio.com",
    projectId: "giants-seo-boilerplate",
    storageBucket: "giants-seo-boilerplate.appspot.com",
    messagingSenderId: "696166703797"
}

firebase.initializeApp(firebaseConfig)

export default firebase