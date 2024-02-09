import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import { auth, db } from "./firebase/firebase";
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { Vortex } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";
import NewProject from "./Components/NewProject";
import { SET_PROJECT } from "./context/actions/projectActions";

function App() {
  const [isloading, setisloading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const nouser = auth.onAuthStateChanged(async userinfo => {
      if (userinfo) {
        console.log((userinfo?.providerData[0]));
        // setDoc(doc(db, "users", userinfo?.uid), userinfo?.providerData[0])
        await setDoc(doc(db, "users", userinfo.uid), userinfo.providerData[0])
        .then(()=>{
           dispatch(SET_USER(userinfo.providerData[0]));
           navigate("/home/projects", {replace:true})
        })
      } else {
        navigate("/home/auth", { replace: true });
      }
      setInterval(()=> {
       setisloading(false);
      },2000)
    });
    return () => nouser();
  }, []);

  useEffect(()=> {
       const projectQuery = query(
        collection(db,"Projects"),
        orderBy("id", "desc")
       )

       const unsubscribe = onSnapshot(projectQuery, querySnaps => {
        const projectsList = querySnaps.docs.map(doc=> doc.data())
        dispatch(SET_PROJECT(projectsList))
       })
       return unsubscribe;
  }, [])

  

  return (
    <>
      {isloading ? (
        <div className='spinner'>
          
          <Vortex
            visible={true}
            height='80'
            width='80'
            ariaLabel='vortex-loading'
            wrapperStyle={{}}
            wrapperClass='vortex-wrapper'
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
          />
          
        </div>
      ) : (
        <div>
          <Routes>
            <Route path='/home/*' element={<Home />} />
            <Route path="/newproject" element= {<NewProject />} />
            <Route path='/*' element={<Navigate to='/home' />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
