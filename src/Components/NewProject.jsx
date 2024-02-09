import React, { useEffect, useState } from "react";
import "./NewProject.css";

import { Splitter, SplitterPanel } from "primereact/splitter";
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import UserProfileDetails from "./UserProfileDetails";
import Alert from "./Alert";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const NewProject = () => {

   

    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [output, setOutput]= useState("");
    const [title, settile] = useState("");
    const [istitle, setistitle] = useState("Untitled");
    const [alert, setalert] = useState(false);

    const user = useSelector((state)=> state.user.user);

    useEffect(()=>{
        updateOutput();
     },[html, css, js])

    const updateOutput=(()=> {
        const showOutput = `
        <html>
        <head>
        <style>${css}</style>
        </head>
        <body>
        ${html}
        <script>${js}</script>
        </body>
        </html>
        `;
        setOutput(showOutput)
    })  

    const saveCode = async() => {
        const id = `${Date.now()}`
        const _doc = {
            id: id,
            html: html,
            css: css,
            js: js,
            output: output,
            user: user
        }

        await setDoc(doc(db,"Projects", id), _doc).then((res)=> {
             {setalert(true)}
        }).catch((err)=> console.log(err))
        setTimeout(()=> {
             setalert(false);
        },2000)
    }

    
  return (
    <div className='newprojectcontainer'>
        {alert && 
           <Alert status= {"Success"} alertMsg= {"Project Saved..."} />
        }
        <header className="newprojectHeadercontainer">
            <div className="newprojectheader">
                <div className="newprojectlogo">
                <svg viewBox="0 0 138 26" className="logoimg" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" title="CodePen" ><path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6" ></path></svg>
                </div>
                <div className="newprojecttitlecontainer">
                    <div className="newprojecttitle">
                       {
                        title? <>
                        <input type="text" placeholder="Enter Title.." value={istitle} onChange={(e)=> setistitle(e.target.value)} />
                        </> : <>
                        <p>{istitle}</p>
                        </>
                       }
                       {
                        title? <>
                        <div onClick={()=> settile(false)}>
                            <MdCheck style={{color: "#10B981"}}/>
                        </div>
                        </> : <>
                        <div onClick={()=> settile(true)}>
                            <MdEdit />
                        </div>
                        </>
                       }
                    </div>
                    <div style={{display:"flex", justifyContent:"center", alignItems: "center", fontSize:"12px"}}>
                       <p>
                       {
                            user.displayName ? user.displayName : `${user.email.split('@')[0]}`
                        }
                       </p>
                       <p style={{fontSize: "7px"}} className="followbtn">
                        Follow+
                       </p>
                    </div>

                </div>
            </div>

            {
                user &&
               (<div className="newprojectsave">
                  <button onClick={saveCode}>Save</button>
                  <UserProfileDetails />
               </div>
               )
            }

        </header>
        
      <div className='codeeditor'>
        <Splitter style={{ height: "100%" }} layout='vertical'>
          <SplitterPanel
            className='htmlcssjs'
            
          >
            <Splitter style={{ height: "100%" }}>
              <SplitterPanel
                className='html'
                
                size={75}
                minSize={10}
              >
                <div className='htmlcontainer'>
                  <div className='htmliconbox'>
                    <div className='htmlicon'>
                      <FaHtml5 style={{ color: "#F75421" }} />
                      <p>HTML</p>
                    </div>
                    <div className='settingicon'>
                      <FcSettings />
                      <FaChevronDown style={{ color: "#C0D5E0" }} />
                    </div>
                  </div>
                  <div className='htmlcode'>
                    <CodeMirror
                    className="CodeMirror"
                       minWidth="100px"
                      value={html}
                      theme={"dark"}
                      height='250px'
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => {
                        setHtml(value)
                      }}
                    />
                  </div>
                </div>
              </SplitterPanel>
              <SplitterPanel
                className='css'
                minSize={10}
                size={75}
              >
                <div className='htmlcontainer'>
                  <div className='htmliconbox'>
                    <div className='htmlicon'>
                      <FaCss3 style={{ color: "#006CB4" }} />
                      <p>CSS</p>
                    </div>
                    <div className='settingicon'>
                      <FcSettings />
                      <FaChevronDown style={{ color: "#C0D5E0" }} />
                    </div>
                  </div>
                  <div className='htmlcode'>
                    <CodeMirror
                    className="CodeMirror"
                      minWidth="100px"
                    //  width="450px"
                      value={css}
                      theme={"dark"}
                      height='250px'
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => {
                        setCss(value)
                      }}
                    />
                  </div>
                </div>
              </SplitterPanel>
              <SplitterPanel
                className='js'
                minSize={10}
                size={75}
              >
                <div className='htmlcontainer'>
                  <div className='htmliconbox'>
                    <div className='htmlicon'>
                      <FaJs style={{ color: "yellow" }} />
                      <p>JS</p>
                    </div>
                    <div className='settingicon'>
                      <FcSettings />
                      <FaChevronDown style={{ color: "#C0D5E0" }} />
                    </div>
                  </div>
                  <div className='htmlcode'>
                    <CodeMirror
                    className="CodeMirror"
                      minWidth="100px"
                      value={js}
                      theme={"dark"}
                      height='250px'
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => {
                        setJs(value)
                      }}
                    />
                  </div>
                </div>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
          <SplitterPanel
            className='coderesult'
          >
            <div className="coderesultdiv" >
                 <iframe title="result" srcDoc={output} style={{width:"100%", height:"100%"}} />
                 
            </div>
           
          </SplitterPanel>
        </Splitter>
      </div>
    </div>
  );
};

export default NewProject;
