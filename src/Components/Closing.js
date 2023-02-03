import React from "react"
import ReactLoading from 'react-loading'; //Loading Screen
import IntroResult from './IntroResult.js'
import axios from 'axios';
import apiRequest from "../api.js"
import {AiOutlineArrowRight} from 'react-icons/ai'
import { fadeIn } from 'react-animations'; // React animation for fade In
import { fadeOut } from 'react-animations'; // React animation for fade out
import Radium, {StyleRoot} from 'radium';
import {  GiHook,GiCheckMark } from "react-icons/gi";


const styles = {
    fade: {
      animation: 'x 1s',
      animationName: Radium.keyframes(fadeIn, 'FadeIn')        
    },
    fadeColor:{
      color:"#7F7F7F"
    },
    dotColor:{
        color:"#58B258"
      }
  } 


export default function Closing(props){

    const [summary,setSummary]=React.useState("")
    const [loading,setLoading]=React.useState(true)
    const [isEnd,setIsEnd]=React.useState(false)

    React.useEffect(function() {
        let introPrompt=`${props.elaborate}\nSummarize the passage with 3 key points:`
        const options=apiRequest(introPrompt)
        
        axios
          .request(options)
          .then(function (response) {
              console.log(response)
              setSummary(response.data.generations[0].text)
              setLoading(false)
          })
          .catch(function (error) {
            console.error(error);
          });
    },[loading])

    function handleEditForSummary(edited){
        setSummary(edited)
    }
    function handleRestartForSummary(){
        setLoading(true)
    }
    function moveToEnd(){
        setIsEnd(prev => !prev)
    }

    return (
        <div className="closing">
               {isEnd ?
               <StyleRoot><header className="present-heading" style={[styles.fade,styles.fadeColor]}>Closing<span className="small-dot" style={styles.dotColor}>.<GiCheckMark style={{width:"10px"}}/></span></header></StyleRoot>
               :
               loading ? 
                 <>
                 <StyleRoot><header className="present-heading">Closing<span className="small-dot">.</span></header></StyleRoot>
                 <ReactLoading  className="loader" type="spinningBubbles" color="#E83D4D"/><p className="loading-text"> Hold on... </p></>
               :<>
               <StyleRoot><header className="present-heading">Closing<span className="small-dot">.</span></header></StyleRoot>
               <IntroResult text={summary}  changeText={handleEditForSummary} reset={handleRestartForSummary} header="Summary" />
               <button onClick={()=>{moveToEnd();props.handleEnd(isEnd);props.handleSummary(summary)}} className="move"><AiOutlineArrowRight/></button></>
               }
       </div>
    )
}