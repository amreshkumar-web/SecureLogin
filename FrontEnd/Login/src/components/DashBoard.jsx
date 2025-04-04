import { useEffect, useState } from "react"
import "../Css/DashBoard.css"
import api from "../utils/ApiHandel"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
export default function DashBoard(){
const [user,setUser]= useState("");
const navigate = useNavigate()
useEffect(()=>{

const userData = async () =>{
    try {
        const response = await api.get('/userData/allUserData');
    if(response.status >=200 && response.status <300){
        setUser(response.data.userData.name);
        console.log(response.data)
        return toast.success("Welcome Back")
    }
    } catch (error) {
        console.log("error in userData DashBoard" , error)
        navigate('/');
        return toast.error("Something went wrong")
    }
}

userData()

},[])





const handelLogout = async () =>{
    try {
         const response = await api.get('/user/logout');
         if(response.status >=200 && response.status <300){
            localStorage.removeItem('xCsrfToken') ;
            navigate('/')
            return toast.success("Logged Out")
        }

    } catch (error) {
        console.log("In Logout",error)
        return toast.error("Something Went Wrong")
    }
}






  return(
    <>
    <div className="DashBoardParent">
<div className="dashBoardChild">
<div className="contentText">
<h1>Hi {user}</h1>
<span>You logged in successfully.</span>
</div>
<button onClick={handelLogout} className="logOutBtn" >Logout</button>
</div>

    </div>
    </>
  )
}