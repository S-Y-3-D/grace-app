import React from "react"
import axios from 'axios';
import ReactLoading from 'react-loading'; //Loading Screen

import { fadeIn } from 'react-animations'; // React animation for fade In
import { fadeOut } from 'react-animations'; // React animation for fade out
import Radium, {StyleRoot} from 'radium';
import {AiOutlineArrowRight} from 'react-icons/ai'
//Icons imports
import {  GiHook,GiCheckMark } from "react-icons/gi";

//Importing API req
import apiRequest from "../api.js"
//Custom Components
import Heading from './Heading.js'
import Body from './Body.js'
import IntroResult from './IntroResult.js'


export default function Speech(props){
    
    const [intro, setIntro]= React.useState("")  /*keeping state of person's intro  */
    const [introAi, setIntroAi]= React.useState("") /*keeping state of Ai generated intro  */
    const [brief,setBrief]=React.useState("")     /*keeping state of brief of presentation generated */
    const [suggest,setSuggest]=React.useState("") /* keeping state of suggestions for the talking heading of topic */


    const [hook, setHook]= React.useState("")   /*keeping state of hooks like quote, question etc */
    const [fetchHook,setFetchHook]=React.useState(false) /*Buttton press for hook */
    const [hookText,setHookText]=React.useState("")
    
    const [fetchIntro,setFetchIntro]=React.useState(false)  /*Buttton press for Intro */
    const [loading,setLoading]=React.useState(false)   //setting the loading when it being fetched
    const [restart,setRestart]=React.useState(false)
    const [isBody,setIsBody]=React.useState(false)

    const [timePassedBox,setTimePassedBox]=React.useState(false)    /*keeping track of time for animation*/
    const [timePassedIntro,setTimePassedIntro]=React.useState(false) // |
    const [timePassedBody,setTimePassedBody]=React.useState(false)
    const [close,setClose]=React.useState(false) 

    

    /*Hook option array*/ 
    const hookOptions = ["Quote","Imagine","What If","Statistic","Powerful","Question"]

    // Animation,font and color styles
    const styles = {
        fade: {
          animation: 'x 1s',
          animationName: Radium.keyframes(fadeIn, 'FadeIn')        
        },
        fadeOut:{
          animation: 'x 1s',
          animationName: Radium.keyframes(fadeOut, 'FadeOut')  
        },
        fadeColor:{
          color:"#7F7F7F"
        },
        dotColor:{
          color:"#58B258"
        }
      } 

    React.useEffect(function() {

      let topicPrompt =`Breifly introduce the topic "${props.topic}"`
      let pointPrompt = `Give 3 talking headings for the topic "${props.topic}"`
      
      const options1=apiRequest(topicPrompt)
      const options2=apiRequest(pointPrompt)  
      axios
          .request(options1)
          .then(function (response) {
              console.log(response)
              setBrief(response.data.generations[0].text)
          })
          .catch(function (error) {
            console.error(error);
          });
      axios
          .request(options2)
          .then(function (response) {
              console.log(response)
              setSuggest(response.data.generations[0].text)
          })
          .catch(function (error) {
            console.error(error);
          });

    },[])

    React.useEffect(function() {
      console.log(loading)
      if(hook.length>0){
        let hookPrompt=`Suggest a ${hook} for the opening of the topic "${props.topic}".\n`
        const options=apiRequest(hookPrompt)
        
        axios
          .request(options)
          .then(function (response) {
              console.log(response)
              setHookText(response.data.generations[0].text)
              setLoading(false)
              setRestart(false)
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },[fetchHook] )

    
    React.useEffect(function() {
     
        let introPrompt=`Introduce yourself in a exciting way "My name is Syed Hamza. I'm a graduate" for a presentation on "AI is dangerous"\n\nGood morning/afternoon everyone and welcome to my presentation. First of all, let me thank you all for coming here today. My name is Syed Hamza. I'm a graduate from Washington University. Today, i will be talking on dangers of AI.\n--\nIntroduce yourself in a exciting way "Imran Ali. A business man" for a presentation on "Why people are important?"\n\nLet me start by saying a few words about my own background.  my name is Imran Ali,I'm a business man. A man who really worked hard to be here. I'm a MBA from MIT and people facinates me. That's what i'm gonna talk about today. Why people are important.\n--\n Introduce yourself in a exciting way "${intro}" for a presentation on "${props.topic}"\n`
        const options=apiRequest(introPrompt)
        
        axios
          .request(options)
          .then(function (response) {
              console.log(response)
              setIntroAi(response.data.generations[0].text)
              setLoading(false)
              setRestart(false)
          })
          .catch(function (error) {
            console.error(error);
          });
    },[fetchIntro] )

    // Keeping the text element sync
    setTimeout(() => {setTimePassedIntro(true)}, 7000);
    setTimeout(() => {setTimePassedBox(true)}, 8000);


    //returning the request taking the prompt 
    
      function handleIntro(event){ 
        setIntro( event.target.value )
      }

      function handleHook(event){
        const id=event.target.id
        console.log(id)
        for(let i=1;i<=hookOptions.length;i++){
          let id_=i.toString()
          if(id!==id_){
            document.getElementById(id_).className="inactive-option-button"
        }
        else{
          document.getElementById(id_).className="active-option-button"
        }
      }
        switch (id) {
          case "1":
            setHook("quote")
            break;
          case "2":
            setHook("imagine")
            break;
          case "3":
            setHook("what if")
            break;
          case "4":
            setHook("statistic")
            break;
          case "5":
            setHook("powerful")
            break;
          case "6":
            setHook("question")
            break;            
          default:
            break;
        }
      }

      function submitHook(){
          setFetchHook(prevHook => !prevHook)
          setFetchIntro(prevIntro => !prevIntro)
          setLoading(true)
        }


      function handleEditForHook(edited){
        setHookText(edited)
      }

      function handleEditForIntro(edited){
        setIntroAi(edited)
      }
        
      function handleRestartForHook(){
          setFetchHook(prevHook => !prevHook)
          setLoading(true)
          setRestart(true)
      }

      function handleRestartForIntro(){
        setFetchIntro(prevIntro => !prevIntro)
        setLoading(true)
        setRestart(true)
    }

    //functions for body of presentation
    function moveToBody(){
      setIsBody(true)
      console.log(suggest)
    }

    function isClosed(close){
      setClose(close)
    }
      
      const options = hookOptions.map( (hook,index) => {
        return (<button key={index} onClick={handleHook} className="inactive-option-button" id={(index+1).toString()}>{hook}</button>)
      })
      return(
        <section className="content-section">
        <Heading />
        
        {isBody ? <StyleRoot><header className="present-heading" style={[styles.fade,styles.fadeColor]}>Intro<span className="small-dot" style={styles.dotColor}>.<GiCheckMark style={{width:"10px"}}/></span></header></StyleRoot> 
         :timePassedIntro &&  <StyleRoot><header className="present-heading" style={styles.fade}>Intro<span className="small-dot">.</span></header></StyleRoot>}
        
        <div className="speech-container">
        
        {
        timePassedBox ? 
          loading ? 
            <><ReactLoading  className="loader" type="spinningBubbles" color="#E83D4D"/>
            <p className="loading-text"> Hold on... </p></>  :
        
        hookText ? 
          isBody ?
           close ? <><StyleRoot><header className="present-heading" style={[styles.fade,styles.fadeColor]}>Body<span className="small-dot" style={styles.dotColor}>.<GiCheckMark style={{width:"10px"}}/></span></header></StyleRoot>
           <div className="closing">
           <header className="present-heading">Closing<span className="small-dot">.</span></header>
               <div className="closing-body"> summary </div>
       </div></>

           :setTimeout(() => {setTimePassedBody(true)}, 1000) && <><StyleRoot><header style={styles.fade} className="present-heading">Body<span className="small-dot">.</span></header></StyleRoot><Body isClose={isClosed} suggest={suggest} /></> :
        <>
        <div className="result-main-container">
          <div className="hook-container">
         <IntroResult text={hookText}  changeText={handleEditForHook} reset={handleRestartForHook} restart={restart} header="Hook" />  
          </div>
          <div className="intro-container">

        <IntroResult text={introAi}  changeText={handleEditForIntro} reset={handleRestartForIntro} restart={restart} header="Introduce" />
          </div>
        </div>
        <button onClick={moveToBody} className="move"><AiOutlineArrowRight/></button>
        </>
        : <StyleRoot><div className="intro"  style={styles.fade}> 
                    <div className="intro-body">
                        <h3 className="question">How you want your hook?</h3>
                        <div className="options">
                            {options}
                            </div>
                            <h3>Optional</h3>
                            <textarea className="introduce"
                             placeholder="Introduce yourself...keep it short and sweet"
                             name="intro" 
                             onChange={handleIntro}
                             value={intro}
                            />
                        </div>
                        {hook.length>0 && <StyleRoot><button style={styles.fade} className="submit" onClick={submitHook}>Get thy hook <GiHook/></button></StyleRoot> }
            </div></StyleRoot> : <></>}
        </div>
        </section>

    )
}