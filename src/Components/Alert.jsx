import React from 'react'

const Alert = ({status, alertMsg}) => {
  return (
    <div>
        {
            status= "Success" && (
                <div style={{backgroundColor: "#10B981", padding: "20px", borderRadius:"5px", position: "fixed", top: "24px", right:"640px"}}>
                <p>{alertMsg}</p>
                </div>
            )
        }
    </div>
  )
}

export default Alert