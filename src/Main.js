import React from "react"

export default function Main(){

    const [topic,setTopic]=React.useState("")

    function handleInput(event)
    {
        setTopic(event.target.value)
    }
    
    return (<>
    <main>
        <section className="main-section">
            <h3>What topic are you presenting on?</h3>
            <br/>
            <input type="text" onChange={handleInput} value={topic} placeholder="Type your Topic"></input>
            
            <div className="suggestions">
            <h5>Some hot topics...</h5>
            <button>Why Machine learning is important?</button>
            <button>3 tips to reduce global warming</button>
            <button>How to protect from is corona virus?</button></div>
        </section>

    </main>
    </>)
}