import React, { useState,useRef,useEffect } from "react";
import '../Css/Login.css';

import { toast } from "react-toastify";
import api from "../utils/ApiHandel"
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import OtpValidate from "./OtpValidate";
import ResetPassword from "./resetPassword";




export default function Login(){
    



//handelOtp Component and forgetPassword
const [otpTab,setOtpTab] = useState(false);
const [forgetPassword,setForgetPassword] = useState(false);







const [selectedContainer,setselectedContainer] = useState("login");


const [fieldClear,setFieldClear]= useState(0);
const [isLoading,setIsLaoding] = useState(true);
const navigate = useNavigate();

//form data collection
const [name,setName] = useState(null);
const [email, setEmail] = useState(null);
const [password, setPassword] = useState(null);
const [confirmPassword, setConfirmPassword] = useState(null);

useEffect(()=>{
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
},[selectedContainer,fieldClear])







//email and password validator

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };






 //generating FingerPrint













//form data handel

const submitData =async (e) =>{
    e.preventDefault();
    
 if(!validateEmail(email)) return toast.error("Pls enter valid email") ;
 if(!validatePassword(password)) return toast.error("Password must be contains at least 1 uppercase ,1 lowercase,1 symbol , 1 number, And password should be legth 6") ;
 

    const formData = new FormData();
 
    if(selectedContainer === "login"){

formData.append("username",email);
formData.append("password",password);
hitLoginApi("/user/login",formData);
       
    }
  else{
    formData.append("name",name);
    formData.append("username",email);
    formData.append("password",password)
    hitRegistrationApi("/user/register" ,formData)
  }

}








useEffect(() => {
    const validateToken = async () => {
   
      try {
        const response = await api.get("/user/userValidation")
  
        if (response.status >= 200 && response.status < 300) {

          toast.success("Welcome Back!");
          navigate("/DashBoard");
        }
      } catch (error) {
        setIsLaoding(false);
        console.log("Validation Error", error);
      }
    };
  
    validateToken(); // Call the async function inside useEffect
  }, []); // Dependency array remains empty
  



 






 



//login Api

const hitLoginApi = async (url,data) =>{

try {
    
    const response = await api.post(url,data ,{
        headers:{
            "Content-Type": "application/json",
        },
    });

    if(response.status >= 200 && response.status<300) {
        toast.success("🎉 Log in Successfully!", {
            icon: "✅",
            className: "custom-toast",
          });  
          
   
     localStorage.setItem("xCsrfToken", response.data.xCsrfToken);
        navigate("/DashBoard");

    }
    else{
        toast.error(response.data.message);
        console.log(response.data)
    }


} catch (error) {
   if(error.response){
    toast.warn(error.response.data.message)
   }
   else{
    toast.warn("Something Went Wrong");
    console.error( "Request Failed" , error);
   }
}

}













//registration Api


const hitRegistrationApi = async (url,data) =>{
  if(password !== confirmPassword) return toast.warn("Confirm Password not match")
  setIsLaoding(true);
    try {
        const response = await api.post(url,data,{
            headers:{
                "Content-Type":"application/json",
            }
        })
    
        if(response.status >= 200 && response.status<300) {
            toast.success("🎉 Otp sended valid for 5min only", {
                icon: "✅",
                className: "custom-toast",
              });  
              console.log(response.data);
              setIsLaoding(false)
              setOtpTab(true)
              
        }
        else{
          setIsLaoding(false)
            toast.error(response.data.message);
            console.log(response.data)
        }
    } catch (error) {
      setIsLaoding(false)
        if(error.response){
            toast.warn(error.response.data.message)
            console.log(error.response.data.message)
           }
           else{
            toast.warn("Something Went Wrong");
            console.error( "Request Failed" , error);
           }
    }

}












const handelOtp = async (username , otp) =>{

  if(!otp) return toast.warn("Pls enter valid otp");
    if(!username) return toast.warn("Bad Request");
try {
  
  const response = await api.post('/user/otpValidate',{username:username,otp:otp});

  if(response.status >= 200 && response.status<300){
    setFieldClear(fieldClear + 1);
     toast.success("🎉 User Successfully Registered")
     return true;
  }
  
} catch (error) {
  console.log("handelOtp Error")
  const status = error.response?.status || error.status; 

  if (status === 429) {
    toast.error("Too many attempts");  
  } 
  else if (status === 500) {
    toast.error("Something went wrong");
  } 
  else {
    toast.error("Wrong OTP");
  }
  return false
}

}




















return(
  
    
    <>
    {
      isLoading && <Loading /> 
    }
    {
      forgetPassword &&  <ResetPassword  setTab={setForgetPassword}/>
    }
    {
      otpTab && <OtpValidate handelOtpFunction={handelOtp} username={email} setTab={setOtpTab}/> 
    }
   
    <div className="loginParent">
      <div className="loginWholeContent">
    <div style={(selectedContainer==="singUp")?{borderColor:"#19CC8B"}:{}} className="loginProfileBlock">
    <div className="face" style={(selectedContainer==="singUp")?{top:"180%"}:{}}></div>
    <div className="faceBody" style={(selectedContainer==="singUp")?{top:"200%"}:{}}></div>
    
    
    

    <div className="addPhoto" style={(selectedContainer==="login")?{top:"200%"}:{}} >
        {
            <><span>+</span></>
        }
        
        </div>    
        
        
    </div> 
    <div className="loginChild">
    <div className="loginSingupContainer">


     <button onClick={() => {setselectedContainer("login")}} style={(selectedContainer==="login")?{color:"white"}:{color:"rgb(151, 151, 151)"}}   aria-label="Login Button" id="loginBtn" data-test="login-button">Login</button>


     <button onClick={() => {setselectedContainer("singUp")}} style={(selectedContainer==="singUp")?{color:"white"}:{color:"rgb(151, 151, 151)"}}   aria-label="Signup Button" id="singUpBtn" data-test="signup-button">SingUp</button>


     <div className="currentButtonIdentifier">
        <div style={(selectedContainer==="login")?{left:0}:{left:"50%"}} className="detecterMover"></div>


     </div>
    </div>

    <div className="loginFormField">
        <div style={(selectedContainer==="login")?{height:0}:{}} className="formTextField">
            <span>Name</span>
            <input value={name} onChange={(e)=>{setName(e.target.value)}} className="loginInputField" type="text" id="Name"/>
            </div>


      <div className="formTextField">
        <span>Email</span>
        <input value={email}  onChange={(e)=>{setEmail(e.target.value)}}  className="loginInputField" type="email" id="Email"/>
        </div>


      <div className="formTextField">
        <span>Password</span>
        <input value={password}  onChange={(e)=>{setPassword(e.target.value)}}  className="loginInputField" type="password" id="password" />
        </div>


      <div style={(selectedContainer==="login")?{height:0}:{}} className="formTextField">
        <span>Confirm Password</span>
        <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}  className="loginInputField" type="password" id="confirmPassword" />
        </div>

    </div>



    <div className="SubmitBtn">
        <button onClick={submitData} className="loginSubmitBtn" id="loginSubmitBtn" data-test="login-submit" type="submit">Submit</button>
        <span onClick={()=>{setForgetPassword(true)}}>Forget Password</span>
    </div>

    </div>




      </div>

    

    </div>
    </>
    
)



}