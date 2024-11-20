import React from 'react'
import { SiSpeedypage } from "react-icons/si";
import "./Auth_Header.css"


const Auth_Header = () => {
    return (
        <div className='AuthContainer' >
            <h4>
                <span><SiSpeedypage /></span>
                RiteFast
            </h4>
        </div>
    )
}

export default Auth_Header