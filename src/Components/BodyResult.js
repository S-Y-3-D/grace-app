import React from "react"
import { fadeIn } from 'react-animations'; // React animation for fade In
import Radium, {StyleRoot} from 'radium';  ////
import {AiOutlineEdit,AiFillHeart,AiFillCopy} from 'react-icons/ai' //Icon imports
import {MdRestartAlt} from 'react-icons/md'

export default function IntroResult(props){

    const [copySuccess, setCopySuccess] = React.useState(false); /*Functional Buttons copy, favorite, edit*/ 
    const [favor,setFavor]=React.useState(false);
    const [edited,setEdited]=React.useState(props.text)   /*Edit Input*/
    const heartColor = {backgroundColor: favor? "#E83D4D":"white",color:favor? "white":"black"}
    const clipboardColor={backgroundColor: copySuccess? "#E9C754" :"white",color:copySuccess? "white":"black"} 
    
    const styles = {
        fade: {
          animation: 'x 1s',
          animationName: Radium.keyframes(fadeIn, 'FadeIn')        
        }
    }

    const copyToClipBoard = async copyMe => {
        try {
          await navigator.clipboard.writeText(copyMe);
          setCopySuccess(true);
        } catch (err) {
          setCopySuccess(false);
        }
    };

    function editHook(event){  /* Function for editing text to intro box */
        setEdited(event.currentTarget.textContent)
    }

    function handleFavorite(){  //function to add favorite
          setFavor(prevFavor => !prevFavor)
    }

  

      return (
        <StyleRoot><div className="intro-body" style={styles.fade}>
          <h3 className="question">{props.header}</h3>
          <div className="result-container">
          <div className="editableBox" contentEditable="true" onInput={editHook}>
            <p className="para">{props.text}</p>
          </div>
          <div className="function-buttons">
              <button title="Send Love" className="heart" onClick={handleFavorite} style={heartColor}><AiFillHeart  /></button>
              <button title="Copy to clipboard" className="copy" onClick={()=>copyToClipBoard(props.text)} style={clipboardColor}><AiFillCopy /></button>
              <button title="Edit" onClick={ ()=> props.changeText(edited,props.index) }><AiOutlineEdit/></button>
              <button title="generate again!" className="restart" onClick={()=>props.reset(props.index)} ><MdRestartAlt/></button>
            </div>
          </div>
        </div>
        </StyleRoot>
      )


    }