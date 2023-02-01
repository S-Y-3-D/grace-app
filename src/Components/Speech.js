import React from "react"
import axios from 'axios';
import ReactLoading from 'react-loading'; //Loading Screen
import { fadeIn } from 'react-animations'; // React animation for fade In
import Radium, {StyleRoot} from 'radium';  ////

//Icons imports
import {AiOutlineDelete,AiOutlineEdit} from 'react-icons/ai' 
import {GrFormAdd} from 'react-icons/gr'
import {  GiHook } from "react-icons/gi";

//Custom Components
import Heading from './Heading.js'
import IntroResult from './IntroResult.js'


export default function Speech(props){
    
    const [intro, setIntro]= React.useState("")  /*keeping state of person's intro  */
    const [introAi, setIntroAi]= React.useState("") 
    const [points, setPoints]= React.useState("") /*keeping state of topic main points  */
    const [pointArray,setPointArray]=React.useState([]) 
    const [brief,setBrief]=React.useState("")
    const [hook, setHook]= React.useState("")   /*keeping state of hooks like quote, question etc */
    const [fetchHook,setFetchHook]=React.useState(false) /*Buttton press for hook */
    const [fetchIntro,setFetchIntro]=React.useState(false)  /*Buttton press for Intro */
    const [hookText,setHookText]=React.useState("")
    const [loading,setLoading]=React.useState(false)   //setting the loading when it being fetched
    const [restart,setRestart]=React.useState(false)
    
    const [timePassedBox,setTimePassedBox]=React.useState(false)    /*keeping track of time for animation*/

    /*Hook option array*/ 
    const hookOptions = ["Quote","Imagine","What If","Statistic","Powerful","Question"]
    
    //enable and disable sumbitHook button
    const submitHookButton=hook?"submit-hook":"non-submit-hook"

    // Animation,font and color styles
    const styles = {
        fade: {
          animation: 'x 1s',
          animationName: Radium.keyframes(fadeIn, 'FadeIn')        
        }
      }

    React.useEffect(function() {

      let topicPrompt =`Breifly introduce the topic "${props.topic}"`
        const options = {
          method: 'POST',
          url: 'https://api.cohere.ai/generate',
          headers: {
            accept: 'application/json',
            'Cohere-Version': '2022-12-06',
            'content-type': 'application/json',
            authorization: 'Bearer BTLdlVK52xTi1DjvelK5C5mYzPqcoeildQ2FlMtA'
          },
          data: {
              model:'command-xlarge-nightly',
              prompt:topicPrompt,
              max_tokens:300,
              temperature:2,
              k:0,
              p:0.75,
              frequency_penalty:0,
              presence_penalty:0,
              stop_sequences:["##"],
              return_likelihoods:'NONE'
          }
        };
        
        axios
          .request(options)
          .then(function (response) {
              console.log(response)
              setBrief(response.data.generations[0].text)
          })
          .catch(function (error) {
            console.error(error);
          });

    },[])

    React.useEffect(function() {
      console.log(loading)
      if(hook.length>0){
        let hookPrompt=`Suggest a ${hook} for the opening of the topic "${props.topic}".\n`
        console.log(hookPrompt)
        const options = {
          method: 'POST',
          url: 'https://api.cohere.ai/generate',
          headers: {
            accept: 'application/json',
            'Cohere-Version': '2022-12-06',
            'content-type': 'application/json',
            authorization: 'Bearer BTLdlVK52xTi1DjvelK5C5mYzPqcoeildQ2FlMtA'
          },
          data: {
              model:'command-xlarge-nightly',
              prompt:hookPrompt,
              max_tokens:300,
              temperature:2,
              k:0,
              p:0.75,
              frequency_penalty:0,
              presence_penalty:0,
              stop_sequences:["##"],
              return_likelihoods:'NONE'
          }
        };
        
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
     
        let introPrompt=`Introduce yourself in a exciting way \"My name is Syed Hamza. I\'m a graduate\" for a presentation on \"AI is dangerous\"\n\nGood morning/afternoon everyone and welcome to my presentation. First of all, let me thank you all for coming here today. My name is Syed Hamza. I\'m a graduate from Washington University. Today, i will be talking on dangers of AI.\n--\nIntroduce yourself in a exciting way \"Imran Ali. A business man\" for a presentation on \"Why people are important?\"\n\nLet me start by saying a few words about my own background.  my name is Imran Ali,I\'m a business man. A man who really worked hard to be here. I\'m a MBA from MIT and people facinates me. That\'s what i\'m gonna talk about today. Why people are important.\n--\n Introduce yourself in a exciting way "${intro}" for a presentation on "${props.topic}"\n`
        const options = {
          method: 'POST',
          url: 'https://api.cohere.ai/generate',
          headers: {
            accept: 'application/json',
            'Cohere-Version': '2022-12-06',
            'content-type': 'application/json',
            authorization: 'Bearer BTLdlVK52xTi1DjvelK5C5mYzPqcoeildQ2FlMtA'
          },
          data: {
              model:'command-xlarge-nightly',
              prompt:introPrompt,
              max_tokens:300,
              temperature:2,
              k:0,
              p:0.75,
              frequency_penalty:0,
              presence_penalty:0,
              stop_sequences:["##"],
              return_likelihoods:'NONE'
          }
        };
        
        axios
          .request(options)
          .then(function (response) {
              console.log(response)
              setIntroAi(response.data.generations[0].text)
          })
          .catch(function (error) {
            console.error(error);
          });
    },[fetchIntro] )

    // Keeping the text element sync
    setTimeout(() => {setTimePassedBox(true)}, 8000);


      function handleIntro(event){ 
        setIntro( event.target.value )
      }
      
      function handlePoints(event){
            const point = event.target.value
            setPoints(point)
      }

      function addPoints(){
            setPointArray( prevArray => {
                if(points.length>0){
                  let newPointArray=[]
                    for(let i=0; i<prevArray.length;i++){
                      newPointArray.push(prevArray[i])
                  }
                      newPointArray.push(points)
                      return newPointArray
                  }
                else{
                  return prevArray
              }
            })         
            setPoints("")

      }

      function editPoint(index){
        //Add edit Point functionality
      }

      
      function deletePoint(index){
        setPointArray( prevArray => {
            let newArray=[]
            for(let i=0;i<prevArray.length;i++){
                if(i!==index){
                    newArray.push(prevArray[i])
                }
            }
            return newArray
        })
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


      function handleEdit(edited){
        setHookText(edited)
      }
        
      function handleRestart(){
          setFetchHook(prevHook => !prevHook)
          setLoading(true)
          setRestart(true)
        }
      
    const displayPoints = pointArray.map( (point,index) => {
        return (<div className="point-holder">
                <p className="points-text">{index+1}. {point} </p>
                <button className="point-holder-edit" onClick={()=>editPoint(index)}><AiOutlineEdit/></button>
                <button className="point-holder-delete" onClick={()=>deletePoint(index)} ><AiOutlineDelete/></button>
                </div>
                )
    })
      const options = hookOptions.map( (hook,index) => {
        return (<button key={index} onClick={handleHook} className="inactive-option-button" id={(index+1).toString()}>{hook}</button>)
      })
      return(
        <section className="content-section">
        <Heading />
        <div className="speech-container">
        {
        timePassedBox ? loading ? <ReactLoading type="bubbles" color="#000" height={'20%'} width={'20%'}/>  :
        hookText ? <IntroResult text={hookText}  changeText={handleEdit} reset={handleRestart} restart={restart} />: <StyleRoot><div className="intro"  style={styles.fade}> 
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
                        <button  className={submitHookButton} onClick={submitHook}>Get thy hook <GiHook/></button>
            </div></StyleRoot> : <></>}
            
            {/* <div className="body">
                <header className="present-heading">Body<span className="small-dot">.</span></header>
                <div className="body-body">
                <h3 className="question">Provide your focus points on given topic?</h3>
                <h5>btw! A good one has 3 focus points</h5>
                <div className="focus-points">
                        <input type="text"
                        className="input-point"
                        name="points"
                        onChange={handlePoints}
                        value={points} 
                        placeholder="Focus Points..."/>
                        <button className="add" onClick={addPoints}><GrFormAdd/></button>
                </div>
                {pointArray.length>0 && <h3 className="points">Your Points</h3>}
                <div className="points-container">
                
                        {displayPoints}
                </div>
                </div>
            </div>
            
            <div className="closing">
                <header className="present-heading">Closing<span className="small-dot">.</span></header>
                    <div className="closing-body"> summary </div>
            </div> */}
        </div>
        </section>

    )
}