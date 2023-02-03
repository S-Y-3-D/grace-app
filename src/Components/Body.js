import React from "react"
import axios from 'axios';
import ReactLoading from 'react-loading'; //Loading Screen
import { fadeIn } from 'react-animations'; // React animation for fade In
import Radium, {StyleRoot} from 'radium';  ////

import {AiOutlineArrowRight,AiOutlineDelete,AiOutlineEdit} from 'react-icons/ai' 
import {GrFormAdd} from 'react-icons/gr'
import {  BiBody } from "react-icons/bi";
import { BsStars,BsBullseye } from "react-icons/bs"
//Importing API req
import apiRequest from "../api.js"
//Importing Custom Components
import BodyResult from "./BodyResult.js"

import Closing from './Closing.js'



export default function Body(props){
    const [points, setPoints]= React.useState("") /*keeping state of topic main points  */
    const [pointArray,setPointArray]=React.useState([])
    const [pointExpanded,setPointExpanded]=React.useState([ ])
    const [body,setBody]=React.useState(false)
    const [loading,setLoading]=React.useState(false)
    const [timePassedInput,setTimePassedInput]=React.useState(false) //|
     /*keeping track of time for animation*/
    const [timePassedFocus,setTimePassedFocus]=React.useState(false) //|
    const [timePassedSuggest,setTimePassedSuggest]=React.useState(false)
    const [timePassedOptions,setTimePassedOptions]=React.useState(false)
    const [restart,setRestart]=React.useState(false)
    const [index,setIndex]=React.useState(0)
    const [isClose,setIsClose]=React.useState(false)

    const suggestions=props.suggest.split('\n')



    const styles = {
        fade: {
          animation: 'x 1s',
          animationName: Radium.keyframes(fadeIn, 'FadeIn')        
        }
    }

    function handleRestartForPoint(index){
        console.log(index)
          setRestart(prev=>!prev)
          setLoading(true)
          setIndex(index)
      }


    
      function handleEditForPoint(edited,index){
        setPointExpanded(prev => {
            let updatedPoints=[]
            for(let i=0;i<prev.length;i++){
                if(i===index){
                    updatedPoints.push(edited)
                }
                else{
                    updatedPoints.push(prev[i])
                }
            }
            return updatedPoints
        } )
        console.log(pointExpanded)
  }
    

       const displayPoints = pointArray.map( (point,index) => {
        return (<div className="point-holder">
                <p className="points-text">{index+1}. {point} </p>
                <button className="point-holder-edit" onClick={()=>editPoint(index)}><AiOutlineEdit/></button>
                <button className="point-holder-delete" onClick={()=>deletePoint(index)} ><AiOutlineDelete/></button>
                </div>
                )
            })
    const suggestOptions = suggestions.map( (option, index) => {
        if(option){  
            const filtered=option.replace(/[.]/g,'').replace(/[0-9]/g,'')
            return(<div onClick={()=>pickSuggestion(index)} className="suggest-text">{filtered}</div> )
     }})

     const pointsExpanded=pointExpanded.map((point,index) => {
            return(<BodyResult text={point}  changeText={handleEditForPoint} index={index} reset={handleRestartForPoint} header={`Focus Point ${index+1}`}/>)
     })

    

    
      
    React.useEffect(function() {
          if(pointArray[index])
          {let pointsPrompt=`Explain this point "${pointArray[index]}". Provide story, facts or analysis to support your point.`
            
          console.log(pointArray.length)
          const options=apiRequest(pointsPrompt)
          axios
            .request(options)
            .then(function (response) {
                console.log(response)
                setPointExpanded(prev => {
                    let updatedPoints=[]
                    for(let i=0;i<prev.length;i++){
                        if(i===index){
                            updatedPoints.push(response.data.generations[0].text)
                        }
                        else{
                            updatedPoints.push(prev[i])
                        }
                    }
                    return updatedPoints
                })
                

            setLoading(false)
            
         })
            .catch(function (error) {
              console.error(error);
            })
            console.log(pointExpanded)}
      },[restart])
    

    React.useEffect(function() {
        
        for(let i=0;i<pointArray.length;i++) {
          
          let pointsPrompt=`Explain this point "${pointArray[i]}". Provide story, facts or analysis to support your point.`
    
          const options=apiRequest(pointsPrompt)
          axios
            .request(options)
            .then(function (response) {
                console.log(response)

                setPointExpanded( prevArray => {
                    
                    if(pointArray.length>0){
                        let newArray=[]
                          for(let i=0; i<prevArray.length;i++){
                            newArray.push(prevArray[i])
                        }
                            newArray.push(response.data.generations[0].text)
                            return newArray
                        }
                      else{
                        return prevArray
                    }
            })
            
            setLoading(false)
            
         })
            .catch(function (error) {
              console.error(error);
            })
            console.log(pointExpanded)
        }
      },[body])


    setTimeout(() => {  setTimePassedFocus(true)}, 1000);
    setTimeout(() => { setTimePassedInput(true)}, 3000);
    setTimeout(() => {  setTimePassedSuggest(true)}, 5000);
    setTimeout(() => {  setTimePassedOptions(true)}, 6000);

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

    function pickSuggestion(index){
        setPoints(suggestions[index].replace(/[.]/g,'').replace(/[0-9]/g,''))
    }


    //Submit button trigger for body
    function submitBody(){
        setPointExpanded([])
        setBody(true)
        setLoading(true)
    }

    function callClose(){
        setIsClose(prev=>!prev)
        return props.isClose(!isClose)
    }

      return(
        
        body ? 
        loading ? 
        <><ReactLoading  className="loader" type="spinningBubbles" color="#E83D4D"/><p className="loading-text"> Hold on... </p></> 
        :
        <div className="result-body-container">
            <div className="body-container">
            {pointsExpanded}
            </div>
            <button onClick={()=>{callClose();props.handleElaborate(pointExpanded)}}  className="move"><AiOutlineArrowRight/></button>
        </div>
        :
        <>
        {timePassedFocus && <StyleRoot><h3 style={styles.fade} className="question">Provide your focus points on given topic?</h3>
        <h3 className="note" style={styles.fade}>btw! A good one has 3 focus points</h3></StyleRoot>}
         <div className="body">
                {timePassedInput && <StyleRoot>
                <div style={styles.fade} className="focus-points">
                        <input type="text"
                        className="input-point"
                        name="points"
                        onChange={handlePoints}
                        value={points} 
                        placeholder="Focus Points..."/>
                <button className="add" onClick={addPoints}><GrFormAdd/></button>
                </div></StyleRoot>}
                {timePassedSuggest && <StyleRoot><h3 style={styles.fade} className="points"><BsStars/> Suggestions</h3></StyleRoot>}
                {timePassedOptions && <StyleRoot><div style={styles.fade} className="point-suggestions">
                    {suggestOptions}
                </div></StyleRoot>}
                {pointArray.length>0 && <h3 className="points"><BsBullseye/> Your Points</h3>}
                <div className="points-container">
                       {displayPoints}
                </div>
                {pointArray.length>=3 && <button  className="submit" onClick={submitBody}>Get the body <BiBody/></button>}
                </div></>
      )
}