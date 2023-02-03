import notes from "../Images/notes.png"
import pencils from "../Images/pencils.png"
import mic from "../Images/mic.png"
import Typewriter from 'typewriter-effect';

export default function Homecontent(){
    return(
    <>
        <div className="notes-container">
            <img src={notes} /></div>
            <h2 className="main-headline">Say <span className="goodbye">goodbye</span> to hours spent writing your speech </h2>
        <div className="pencil-container">
            <img src={pencils} /></div>
   <div className="sell">
        <div className="mics"></div>
    <div className="sell-headline">
    <Typewriter options={{
        autoStart: true,
        loop: true}}
        onInit={(typewriter) => {
        typewriter.typeString('Write graceful<br/>and elegant<br/>talks in mins.')
        .callFunction(() => {
        console.log('String typed out!');
        })
        .pauseFor(2000)
        .deleteChars(5)
        .typeString('<span style="text-shadow: 0 0 8px #fff;" >5</span> mins.')
        .pauseFor(10000)
        .callFunction(() => {
        console.log('All strings were deleted');
        })
        .start();
        }}/>
        </div>
    </div></>
)}