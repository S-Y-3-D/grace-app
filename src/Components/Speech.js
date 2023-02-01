import React from "react"
import { fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'
import {GrFormAdd} from 'react-icons/gr'


export default function Speech(props){
    
    const [intro, setIntro]= React.useState("")
    const [points, setPoints]= React.useState("")
    const [pointArray,setPointArray]=React.useState([])

    /*keeping track of time for animation*/
    const [timePassedCover,setTimePassedCover]=React.useState(false) 
    const [timePassedParts,setTimePassedParts]=React.useState(false) 
    const [timePassedSmall,setTimePassedSmall]=React.useState(false)  
    const [timePassedBox,setTimePassedBox]=React.useState(false)
    /**/  
    

    // Animation,font and color styles
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


    // Keeping the text element sync
    setTimeout(() => {setTimePassedCover(true)}, 1000);
    setTimeout(() => {  setTimePassedParts(true)}, 3000);
    setTimeout(() => { setTimePassedSmall(true)}, 5000);
    setTimeout(() => {setTimePassedBox(true)}, 7000);


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

      const displayPoints = pointArray.map( (point,index) => {
        return (<div className="point-holder">
                <p className="points-text">{index+1}. {point} </p>
                <button className="point-holder-edit" onClick={()=>editPoint(index)}><AiOutlineEdit/></button>
                <button className="point-holder-delete" onClick={()=>deletePoint(index)} ><AiOutlineDelete/></button>
                </div>
                )
    })
      return(
        <section className="content-section">
        <div className="heads">
        {timePassedCover && <StyleRoot><h3 style={styles.fade}>We got you covered</h3></StyleRoot>}
        {timePassedParts && <StyleRoot><h3 style={[styles.fade,styles.font]}>Presentations are divided into three parts</h3></StyleRoot>}
        {timePassedSmall && <StyleRoot><h3 style={[styles.fade,styles.color]}>We will cover each one by one</h3></StyleRoot>}
        </div>
        {timePassedBox && <StyleRoot>
        <div className="speech-container" style={styles.fade}>
            <div className="intro"> 
                <header>Intro<span className="small-dot">.</span></header>
                    <div className="intro-body">
                        <h3 className="question">How you want your hook?</h3>
                        <div className="options">
                            <button>Quote</button>
                            <button>Imagine</button>
                            <button>What If</button>
                            <button>Statistic</button>
                            <button>Powerful</button>
                            <button>Question</button>
                            </div>
                            <h3>Optional</h3>
                            <textarea className="introduce"
                             placeholder="Introduce yourself...keep it short and sweet"
                             name="intro" 
                             onChange={handleIntro}
                             value={intro}
                            />
                        </div>
            </div>
            
            <div className="body">
                <header>Body<span className="small-dot">.</span></header>
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
                <header>Closing<span className="small-dot">.</span></header>
                    <div className="closing-body"> summary </div>
            </div>
        </div></StyleRoot>}
        </section>

    )
}