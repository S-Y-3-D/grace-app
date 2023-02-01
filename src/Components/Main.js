import React from "react"
import Speech from "./Speech.js"
import axios from 'axios';

export default function Main(){

    
    const [topic,setTopic]=React.useState("")
    const [suggestions,setSuggestions]=React.useState("Loading")
    const [selectTopic,setSelectTopic]=React.useState(false)
    
   

React.useEffect( function(){

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
            prompt:'Suggest 3 topics to give a speech on\nSuggestions:\n',
            max_tokens:300,
            temperature:1.1,
        }
      };
      
      axios
        .request(options)
        .then(function (response) {
            setSuggestions(response.data.generations[0].text)
        })
        .catch(function (error) {
          //console.error(error);
        });
   
},[])

    function submitTopic(){
        setSelectTopic(true)
    }
    function handleInput(event)
    {
        setTopic(event.target.value)
    }

    
    return (<>
    <main>
       { selectTopic ? <Speech topic={topic}/>  
       
       
       
       
       
       
       
       
       
       :<section className="main-section">
            <h3>What topic are you presenting on?</h3>
            <br/>
                <div className="input-container">
                    <input className="input-topic" type="text" onChange={handleInput} value={topic} placeholder="Type your Topic"></input>
                    {topic.length > 0 && <button onClick={submitTopic} className="Go">go</button>}</div>
            <div className="suggestions">
                <h5>Here are some topics for you</h5>
                <div><p className="opt">{suggestions.split('\n')[0] || suggestions}</p></div>
                <div><p className="opt">{suggestions.split('\n')[1] || suggestions}</p></div>
                <div><p className="opt">{suggestions.split('\n')[2] || suggestions}</p></div></div>
        </section>
}
    </main>
    </>)
}