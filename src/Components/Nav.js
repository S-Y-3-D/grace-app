import React from "react"
import Hamburger from 'hamburger-react'

export default function Nav(){
    return(
        <nav className="navbar">
            <h3 className="logo">grace</h3><span className="dot">.</span>
            <div className="routes">
                <Hamburger color="#E83D4D" size={20}/>
            </div>
        </nav>
    )
}