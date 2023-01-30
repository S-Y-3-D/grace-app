import React from "react"

export default function Nav(){
    return(
        <nav class="navbar">
            <h3 class="logo">grace.</h3>
            <ul class="routes">
                <li class="active">home</li>
                <li>blogs</li>
                <li>docs</li>
            </ul>
        </nav>
    )
}