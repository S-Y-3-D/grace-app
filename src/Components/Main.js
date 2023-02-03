import React from "react"
import Speech from "./Speech.js"
import axios from 'axios';
import Homecontent from "./Homecontent.js"
import Arrow, { DIRECTION } from 'react-arrows'
import apiRequest from "../api.js"
import {HiArrowCircleRight} from "react-icons/hi"

import ReactLoading from 'react-loading'; //Loading Screen


export default function Main(){

    
    
    const [topic,setTopic]=React.useState("")
    const [suggestions,setSuggestions]=React.useState("")
    const [selectTopic,setSelectTopic]=React.useState(false)
    
   
    

React.useEffect( function(){

    let prompt='Suggest 3 topics to give a speech on\nSuggestions:\n'
    const options=apiRequest(prompt)
      
      axios
        .request(options)
        .then(function (response) {
            const filtered=response.data.generations[0].text.replace(/[.]/g,'').replace(/[0-9]/g,'')
            setSuggestions(filtered)
            
        })
        .catch(function (error) {
          console.error(error);
        });
   
},[])

    function submitTopic(){
        setSelectTopic(true)
    }
    function handleInput(event)
    {
        setTopic(event.target.value)
    }

    function updateTopic(suggest){
        setTopic(suggest)
    }

    console.log(selectTopic)
    return (<>
    <main>
       { selectTopic ? <Speech topic={topic}/>  
       
       :

       <><Homecontent /><br/><br/>
       <section className="main-section">
            <h3 id="quest"><strong>What topic are you presenting on?</strong></h3>
            <br/>
                <div className="input-container">
                    <input className="input-topic" type="text" onChange={handleInput} value={topic} placeholder="Type your Topic"></input>
                   {topic.length>0 && <button onClick={submitTopic} className="add"><HiArrowCircleRight /></button>}
                   </div>
            
                    <h2>Here are some suggestions</h2>
            {suggestions ? (<div className="point-suggestions">
                
                <div className="suggest-text2" onClick={()=>updateTopic(suggestions.split('\n')[0])} >{suggestions.split('\n')[0]}</div>
                <div className="suggest-text2" onClick={()=>updateTopic(suggestions.split('\n')[1])}>{suggestions.split('\n')[1]}</div>
                <div className="suggest-text2" onClick={()=>updateTopic(suggestions.split('\n')[2])}>{suggestions.split('\n')[2]}</div></div>)
             :
             <><ReactLoading  className="loader" type="spinningBubbles" color="#E83D4D"/><p className="loading-text"> Hold on... </p></>
             }
        </section></>
}
    </main>
    </>)
}