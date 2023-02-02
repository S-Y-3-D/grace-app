import React from "react"
import { fadeIn } from 'react-animations'; // React animation for fade In
import Radium, {StyleRoot} from 'radium';  ////

export default function Bodyheadings(){
    const [timePassedBody,setTimePassedBody]=React.useState(false)  /*keeping track of time for animation*/
    const [timePassedFocus,setTimePassedFocus]=React.useState(false) //|

    const styles = {
        fade: {
          animation: 'x 1s',
          animationName: Radium.keyframes(fadeIn, 'FadeIn')        
        }
    }
    setTimeout(() => {setTimePassedBody(true)}, 1000);
    setTimeout(() => {  setTimePassedFocus(true)}, 3000);

    return (
        <>{timePassedBody && <StyleRoot><header style={styles.fade} className="present-heading">Body<span className="small-dot">.</span></header></StyleRoot>}
                {timePassedFocus && <StyleRoot><h3 style={styles.fade} className="question">Provide your focus points on given topic?</h3>
                <h3 className="note" style={styles.fade}>btw! A good one has 3 focus points</h3></StyleRoot>}</>
    )
}