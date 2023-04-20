import firebase from "firebase"



const firebaseConfig = {
    apiKey: "AIzaSyBvyFKUAAZEWNfddrQFusuoLnPBuMdqsBU",
    authDomain: "netflix-clone-52090.firebaseapp.com",
    projectId: "netflix-clone-52090",
    storageBucket: "netflix-clone-52090.appspot.com",
    messagingSenderId: "389607862759",
    appId: "1:389607862759:web:d24b443fa64d34540a4d42",
    measurementId: "G-35R97KBR4R"
};
  

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
export default storage;