import React, { useState } from 'react'
import "./SignUp.css";
import { FaEnvelope, FaEyeSlash, FaGithub } from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc'
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Login from './Login';
// import {  signInWithGoogle } from '../utils/firebasecontainer';
import { signInWithGithub, signInWithGoogle } from '../utils/firebasecontainer';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";


const SignUp = () => {

    const [pass,setPass]= useState("");
    const[email, setEmail] = useState("")
    const [validEmail, setValidEmail] = useState(false);
    const[showpass, setshowpass] = useState(false);

    const showpassword = () => {
        setshowpass(!showpass);
    }

    const usersignin = async () => {
           await createUserWithEmailAndPassword(auth,email,pass)
           .then((userinfo)=>{
            notify("Sign Up Successfull")
           }).catch((err)=>errorNotification("Enter Valid Email or Password"))
    }

    const checkemail = (e) => {
        setEmail(e.target.value);
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const status= pattern.test(email);
        setValidEmail(status);
    }

    const notify = (text) => {
        toast.success(text, {
          position: "top-center",
        });
      };
    
      const errorNotification = (text) => {
        toast.error(text, {
          position: "top-center",
        });
      };


  return (
    <div className='signupcontainer'>
        <h3>Join us</h3>
        {/* <br /> */}
        <ToastContainer />
        <div className='signupform'> 
            <label className='form'>Email
            </label>
            <div className='signupemail'>
                <FaEnvelope className='emailicon'/>
            <input type='text' placeholder='Enter Mail..' onChange={checkemail} className={!validEmail && email.length>0 ? "validemail" : "notvalid"}/>
            </div>
            <label className='form' >Password
            </label>
            <div className='signuppass'>
                <RiLockPasswordFill  className='passicon'/>
            <input type={showpass ? "text": "password"} placeholder='Enter Password..' onChange={(e)=>setPass(e.target.value)}/>
            <div onClick={showpassword}>
            {
            showpass ? (<FaEyeSlash className='visibility'/>) : (<FaEye className='visibility'/>)
            }
            </div>
            </div>
            <div>
            <button className='signupbtn' onClick={usersignin}>Sign Up</button>
            <p className='alreadyhaveacc'>Already have an account!! <Link to={"/home/login"} className='redirecttologin'><span>LogIn</span></Link> </p>
            </div>
            <div className='orline'>
                <div className='line'></div>
                <p className='or'>OR</p>
                <div className='line'></div>
            </div>
            <div className='googlesignin' onClick={signInWithGoogle}>
                <FcGoogle className='googleicon'/>
                <p style={{color:"white"}}>Sign In with Google</p>
            </div>
            <div className='orline'>
                <div className='line'></div>
                <p className='or'>OR</p>
                <div className='line'></div>
            </div>
            <div className='googlesignin' onClick={signInWithGithub}>
                <FaGithub className='githubicon'/>
                <p style={{color:"white"}}>Sign In with Github</p>
            </div>
        </div>
    </div>
  )
}

export default SignUp