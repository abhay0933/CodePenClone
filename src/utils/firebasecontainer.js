import {GithubAuthProvider, GoogleAuthProvider, signInWithRedirect} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

const googleprovider = new GoogleAuthProvider();
const githubprovider = new GithubAuthProvider();



export const signInWithGoogle = async () => {
    await signInWithRedirect(auth, googleprovider).then((userinfo)=>{
        window.location.reload()
    })
}

export const signInWithGithub = async () => {
    await signInWithRedirect(auth, githubprovider).then((userinfo) =>{
             window.location.reload();
    })
}

export const menu = [
    {id: uuidv4(), name:"Projects", url: "/home/projects" },
    {id: uuidv4(), name:"Collections", url: "/home/collection" },
    {id: uuidv4(), name:"Profile", url: "/home/profile" },
];

export const signoutfn = async() => {
  await auth.signOut().then(()=>{
    window.location.reload();
  })
}

