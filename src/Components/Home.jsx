import { useState } from "react";
import "./Home.css";
import { HiChevronDoubleLeft } from "react-icons/hi";
import {MdHome} from "react-icons/md";
import {FaSearchengin} from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Projects from "./Projects";
import Login from "./Login";
import { useSelector } from "react-redux";
import UserProfileDetails from "./UserProfileDetails";

const Home = () => {

    const [issidemenu,setsidemenu]= useState(true);
    const user= useSelector (state => state.user?.user);
    
  return (
    <div className="homeContainer">
      <div className={issidemenu ? "homeLeftside" : "closehomeLeftside"}>
        <div className='homesmallbtn' onClick={()=> setsidemenu(!issidemenu)}>
          <HiChevronDoubleLeft className='homelefticon' />
        </div>
        <div className="homeleftcontent">
            <Link to={'/home'}>
            <svg viewBox="0 0 138 26" className="logoimg" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" title="CodePen" ><path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6" ></path></svg>
            </Link>

            {
                user ? <Link to={"/newproject"}>
                <button className="newprojectbtn" >Start New Project</button>
             </Link> : <Link to={"/home/auth"}>
               <button className="newprojectbtn" >Start New Project</button>
            </Link>
            }

           {user &&
            (<Link to={"/home/projects"} className="homelefthomebtn">
           <MdHome />
           <p>Home</p>
           </Link>)}

        </div>
      </div>
      <div className="homerightside">
        <div className="hometoprightcontainer">
        <div className="homesearch">
          <FaSearchengin className="homeprojectsearchicon" />
          <input type="text" placeholder="Search here.." />
        </div>
        {
            !user && (
                <div className="homesigninbtn">
                    <Link to={"/home/auth"}>
        <button>SignUp</button>
        </Link>
                </div>
            )
        }
        {user && <UserProfileDetails />}

      </div>
      <div className="homebottomrightcontainer">
        <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path="/auth" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      </div>
    </div>
  );
};

export default Home;
