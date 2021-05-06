import app from 'firebase/app';
import 'firebase/auth';
//import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCaZl0gNfaCzamzYQ6ZGKKGiYt8Rts0pDI",
    authDomain: "get-a-card.firebaseapp.com",
    projectId: "get-a-card",
    storageBucket: "get-a-card.appspot.com",
    messagingSenderId: "740087489453",
    appId: "1:740087489453:web:8f5a39f2a733cbe36f3724"
};

class Firebase
{
    constructor()
    {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        //this.db = app.firestore();
        this.storage = app.storage();
    }
}

export default new Firebase();