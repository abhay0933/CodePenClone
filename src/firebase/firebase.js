import {getApp,getApps,initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD0-gn9Xf6m3IjQCWWyjCtEj6wRcnPRTtk",
    authDomain: "codepenclone-mct5-bd8a9.firebaseapp.com",
    projectId: "codepenclone-mct5-bd8a9",
    storageBucket: "codepenclone-mct5-bd8a9.appspot.com",
    messagingSenderId: "447197887077",
    appId: "1:447197887077:web:4388fdc771fa4685f3648c"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db= getFirestore(app);

  export {app, auth, db};