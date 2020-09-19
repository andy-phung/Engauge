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
                <div className="navbar-item">Home</div>
                <div className="navbar-item">Sessions</div>
                <div className="navbar-item">Reports</div>
            </div>
        </>
    )
}