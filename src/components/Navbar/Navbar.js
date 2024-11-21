import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const authData = localStorage.getItem("auth");
        if (authData) {
            const parsedAuth = JSON.parse(authData); // Parse the JSON string
            setEmail(parsedAuth.user.email); // Access the nested email
            setToken(parsedAuth.token)
        }
    }, []);

    const onclickLogout = () => {
        localStorage.clear("auth")
        navigate("/signin")
    }

    return (
        <div style={{ height: "7vh" }} className='navMainContainer w-100' >
            <p>Hello <span className='text-dart' style={{ fontWeight: 900, fontSize: "20px" }} >{email}</span></p>
            <p className='lagoutPara text-primary' onClick={onclickLogout}  >Logout</p>
        </div>
    )
}

export default Navbar