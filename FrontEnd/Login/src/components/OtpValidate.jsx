import { useState } from "react"
import "../Css/OtpValidate.css"
import { toast } from "react-toastify";

export default function OtpValidate({handelOtpFunction,username,setTab}){
    const [otp,setOtp]= useState(0);
    
    async function handelOtpValue(){
        
        if(otp < 100000 ) return toast.warn("Pls enter valid otp")
            console.log("hua")
            if(!(await handelOtpFunction(username,otp))) return;
        setTab(false);
    }
    
    return (
        <>
        <div className="otpSectionParent">
        
        <div className="OtpContainer">
            <div className="otpInputDiv">
                <span>Otp</span>
                <input onChange={(e)=>{setOtp(e.target.value)}} className="otpInputField" type="number" />
            </div>
            <div className="otpAcceptDecline">
                <button onClick={handelOtpValue} className="otpSubmit">Submit</button>
                <button onClick={()=>{setTab(false)}} className="otpDecline">Decline</button>
            </div>
        </div>
        

        </div>
        </>
    )
}