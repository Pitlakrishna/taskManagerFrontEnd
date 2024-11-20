import React, { useEffect, useState } from 'react'
import "./Navbar.css"

const Navbar = () => {

    const [email, setEmail] = useState('')

    useEffect(() => {
        const authData = localStorage.getItem("auth");
        if (authData) {
            const parsedAuth = JSON.parse(authData); // Parse the JSON string
            setEmail(parsedAuth.user.email); // Access the nested email
        }
    }, []);

    return (
        <div style={{ height: "7vh" }} className='navMainContainer w-100' >
            <p>Hello <span className='text-dart' style={{ fontWeight: 900, fontSize: "20px" }} >{email}</span></p>
            <p className='text-primary' >Logout</p>
        </div>
    )
}

export default Navbar