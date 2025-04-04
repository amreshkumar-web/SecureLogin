import ('../Css/ResetPassword.css')
import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/ApiHandel';
import Loading from './Loading';
export default function ResetPassword({setTab}){
    const [formData, setFormData] = useState({
        Username: "",
        "New Password": "",
        "Confirm Password": ""
    });

    const [otp,setOtp] = useState(0);
    const [otpSended,setOtpSended] = useState(false);
    const [submitButton,setSubmitButton] = useState(false);
    const [otpSending,setOtpSending] = useState(false);
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    
      const validatePassword = (password) => {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(password);
      };






const submitUpdatedPassword = async () => {
const username = formData.Username;
const password=formData['New Password']

    if(!submitButton) return toast.warn("Something Went wrong");
    if(!otpSended) return toast.warn("Otp is not Generated");
    if(otp < 100000) return toast.warn("Pls enter valid Otp")
    if(!validateEmail(username)) return toast.warn("Bad request")
     if(!validatePassword(password)) return toast.warn("Password must have 1 uppercase, 1 lowercase, 1 symbol, 1 number, and be ≥6 characters.")       
    if(password !== formData["Confirm Password"]) return toast.warn("Confirm Password not matched")
   
        try {
            const response = await api.put  ('/user/resetPassword',{username:username,password:password,otp:otp} )
            if(response.status >= 200 && response.status < 300){
                setTab(false);
                return toast.success("Password Changed");
            }
        } catch (error) {
            console.log("Error in submitUpdatedPassword",error)
            return toast.error("Pls try again after few min");
        }
    }









const otpGenerator = async (username) =>{
    setOtpSending(true)
if(!username) return toast.warn("Invalid username");
try {
    
const response = await api.post('/user/generateOtpResetPassword',{username:username});
if(response.status>=200  && response.status <300){
setOtpSended(true);
setSubmitButton(true);   
setOtpSending(false)
return true;
}

} catch (error) {
    setOtpSending(false)
    console.error("error in otp generator",error);
    return false
}

}












const AllfieldValidator = async () =>{
    if(otpSended) return toast.warn("Otp already sended")
        const username = formData.Username;
    const password = formData["New Password"];
    if(!validateEmail(username)) return toast.warn("Invalid UserName");
    if(!validatePassword(password)) return toast.warn("Invalid Password");
   if(formData["New Password"] !== formData["Confirm Password"]) return toast.warn("Confirm Password not match")
    try {
        const response = await api.post('/user/checkUserExist',{username:username});
        if(response.status>=200  && response.status <300){
         if((await otpGenerator(username))){
            return toast.success('Otp Generated')
         }
         else{
            return toast.error('Failed to generate otp try again')
         }
        }

    } catch (error) {
        console.log('error in AllfieldValidator',error);
        return toast.warn("User not found");

    }


}






    return(
        <>
       {
        otpSending &&  <Loading Data="Sending Otp"/>
       }
        <div className="resetPasswordSectionParent">
        
        <div className="resetPasswordContainer">
           
        {
            !submitButton && <div className="resetPasswordInputDiv">
            <span>Username</span>
            <input 
                onChange={(e) => setFormData(prev => ({ ...prev, Username: e.target.value }))} 
                className="resetPasswordInputField" 
                type="text"
            />
        </div>
        }
        {
    [ 'New Password', 'Confirm Password'].map((item, index) => {
        return (
            <div className="resetPasswordInputDiv" key={index}>
                <span>{item}</span>
                <input 
                    onChange={(e) => setFormData(prev => ({ ...prev, [item]: e.target.value }))} 
                    className="resetPasswordInputField" 
                    type="text"
                />
            </div>
        );
    })
}

<div  className="resetPasswordInputDiv" >
                <span>Otp</span>
                <div className="otpFieldAnadGet">
                <input 
                    onChange={(e)=>{setOtp(e.target.value)}} 
                    className="resetPasswordInputField" 
                    id='reset'
                    type="number"
                    style={{width:"100%"}}
                />
                <button onClick={AllfieldValidator} className="getOtpButton">Get Otp</button>
                </div>
            </div>






            <div className="resetPasswordAcceptDecline">
                <button  onClick={submitUpdatedPassword}  className="resetPasswordSubmit">Submit</button>
                <button onClick={()=>{setTab(false)}} className="resetPasswordDecline">Decline</button>
            </div>
        </div>

</div>

        </>
    )
} 