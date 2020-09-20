import React from 'react';
import '../Styles/Navbar.css'

function menuClick() {
    if (document.querySelector(".navbar").style.display === "none" ||
            document.querySelector(".navbar").style.display === '') {
        document.querySelector(".navbar").style.display = "flex"
        document.querySelector(".nav-menu").style.backgroundColor = "#979797"
        document.querySelector(".nav-menu").style.transition = "0.2s"
    }
    else {
        document.querySelector(".navbar").style.display = "none"
        
        document.querySelector(".nav-menu").style.backgroundColor = "transparent"
    }

}

export default function Navbar() {
    return(
        <>
            <div className="nav-menu" onClick={() => { menuClick() }}>Menu</div>
            <div id="navbar" className="navbar">
                <a href="/"><div className="navbar-item" >Home</div></a>
                <a href="/upload"><div className="navbar-item">Upload</div></a>
                <a href="/reports"><div className="navbar-item">Reports</div></a>
            </div>
        </>
    )
}