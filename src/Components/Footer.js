import React from "react"
import {AiFillHeart} from "react-icons/ai"
import ReactCountryFlag from "react-country-flag"

const styles={
    color:"#E83D4D"
}

export default function Footer(){
    return(
    <footer className="footer-container">
        <span>Made in <AiFillHeart style={styles}/><AiFillHeart style={styles}/>Pakistan</span> 
</footer>
    )
}