import React from "react"
import { fadeIn } from 'react-animations'; // React animation for fade In
import Radium, {StyleRoot} from 'radium';  ////

export default function Heading(){
    const [timePassedCover,setTimePassedCover]=React.useState(false)  /*keeping track of time for animation*/
    const [timePassedParts,setTimePassedParts]=React.useState(false) //|
    const [timePassedSmall,setTimePassedSmall]=React.useState(false) //| 
   
    setTimeout(() => {setTimePassedCover(true)}, 1000);
    setTimeout(() => {  setTimePassedParts(true)}, 3000);
    setTimeout(() => { setTimePassedSmall(true)}, 5000);

    const styles = {
        fade: {
          animation: 'x 1s',
          animationName: Radium.keyframes(fadeIn, 'FadeIn')        
        },
        font: {
            fontSize:"30px",
            margin:"0"
          },
        color: {  
            color: 'rgba(0, 0, 0, 0.5)'
          }
      }

    return(<div className="heads">
    {timePassedCover && <StyleRoot><h3 style={styles.fade}>We got you covered</h3></StyleRoot>}
    {timePassedParts && <StyleRoot><h3 style={[styles.fade,styles.font]}>Presentations are divided into three parts</h3></StyleRoot>}
    {timePassedSmall && <StyleRoot><h3 style={[styles.fade,styles.color]}>We will cover each one by one</h3></StyleRoot>}
    
    </div>)
}