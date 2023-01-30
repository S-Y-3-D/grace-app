import React from "react"

export default function Nav(){
    return(
        <nav className="navbar">
            <h3 className="logo">grace.</h3>
            <ul className="routes">
                <li className="active">home</li>
                <li>blogs</li>
                <li>docs</li>
            </ul>
        </nav>
    )
}