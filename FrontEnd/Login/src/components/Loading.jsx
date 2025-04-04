import Lottie from "lottie-react";
import animationData from "../assets/loadingAnimation.json"

export default function Loading({Data}){
  return(
    <div style={{position:"absolute",width:"100%",height:"100vh",zIndex:"99999",backgroundColor:"rgba(0, 0, 0, 0.12)",backdropFilter:"blur(10px)",display:"flex",justifyContent:"center",alignItems:"center",overflow:"hidden",flexDirection:"column"}} className="loader">

    <Lottie animationData={animationData} style={{ width: 100, height: 100 }} loop={true} />
   <p style={{fontSize:"1.3rem",color:"rgba(245, 245, 245, 0.26)"}}>{Data}</p>
    </div>
  )
}