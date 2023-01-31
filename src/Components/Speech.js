import React from "react"
import { fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';


export default function Speech(props){
    const styles = {
        fade_cover: {
          animation: 'x 1s',
          animationName: Radium.keyframes(fadeIn, 'FadeIn')        
        },
        fade_parts: {
            animation: 'x 4s',
            animationName: Radium.keyframes(fadeIn, 'FadeIn'),
            fontSize:"30px",
            margin:"0"
          },
          fade_small: {
            animation: 'x 6s',
            animationName: Radium.keyframes(fadeIn, 'FadeIn'),       
            color: 'rgba(0, 0, 0, 0.5)',
          },
          fade_box:{
            animation: 'x 8s',
            animationName: Radium.keyframes(fadeIn, 'FadeIn'), 
          }
      }
    
      
    
      return(
        <section className="main-section">
        <StyleRoot><h3 style={styles.fade_cover}>We got you covered</h3></StyleRoot>
        <StyleRoot><h3 style={styles.fade_parts}>Presentations are divided into three parts</h3></StyleRoot>
        <StyleRoot><h3 style={styles.fade_small}>We will cover each one by one</h3></StyleRoot>
        <StyleRoot>
        <div className="speech-container" style={styles.fade_box}>
            <div className="intro"> 
                <header>Intro<span className="small-dot">. </span></header>
                    <div className="intro-body">
                        <h3>How you want your hook?</h3>
                        <div className="options">
                            <button>Quote</button>
                            <button>Imagine</button>
                            <button>What If</button>
                            <button>Statistic</button>
                            <button>Powerful</button>
                            <button>Question</button>
                            </div>
                            <h3>Optional</h3>
                            <textarea className="introduce">Introduce yourself...
keep it short and sweet</textarea>
                        </div>
            </div>
            
            <div className="body">
                <header>Body<span className="small-dot">.</span></header>
                <div className="body-body"> Inputs</div>
            </div>
            
            <div className="closing">
                <header>Closing<span className="small-dot">.</span></header>
                    <div className="closing-body"> summary </div>
            </div>
        </div></StyleRoot>
        </section>

    )
}