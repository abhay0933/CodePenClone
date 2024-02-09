import React, { useState } from 'react'
import './UserProfileDetails.css'
import { useSelector } from 'react-redux';
import { FaChevronDown } from 'react-icons/fa';
import { menu, signoutfn } from '../utils/firebasecontainer';
import { Link } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const UserProfileDetails = () => {

    const [showoption, setshowoption] = useState(false);

    const user= useSelector (state => state.user?.user);
  return (
    <div className='userprofilecontainer'>
        <div className='userphoto' >
          {
            user.photoURL ? (
                <img src={user.photoURL} />
            ) : (
                <p>{user.email[0].toUpperCase()}</p>
            )
          }

        </div>
        <div className='profiledownbtn' onClick={()=> setshowoption(!showoption)}>
            <FaChevronDown />
        </div>
        {
            showoption && (
                <div className='profiledownoptions'>
            {
                menu && menu.map ((m)=>(
                    <Link to={m.url} key={m.id} className='optionprofile'>{m.name}</Link>
                ))
            }
            <p className='optionprofile' onClick={signoutfn}>Sign Out</p>
        </div>
            )

        }
    </div>
  )
}

export default UserProfileDetails