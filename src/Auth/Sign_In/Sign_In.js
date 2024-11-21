import React, { useState } from 'react';
import AuthHeader from '../Auth_Header/Auth_Header';
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialGooglePlus } from "react-icons/ti";
import "./Sign_In.css";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const SignIn = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const { email, password } = formData;
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://backendtaskmanger.onrender.com/api/v1/auth/login`, { email, password });
            if (res && res.data.success) {
                toast.success("Succesfully SignIn ...")
                localStorage.setItem("auth", JSON.stringify(res.data))
                localStorage.setItem("token", JSON.stringify(res.data.token))
                navigate("/")
            } else {

            }
        } catch (error) {
            toast.error(error.message || "Somthing went wrong..")
        }
    }

    return (
        <div>
            <AuthHeader />
            <div className='signUpContainer' >
                <button className='btn-primary formControl button '><span className='socialButton' ><TiSocialFacebook /></span> Sign up with Facebook</button>
                <button className='btn-danger formControl mt-n3 button'><span className='socialButton' ><TiSocialGooglePlus /></span> Sign up with Google+</button>
                <p>OR</p>
                <form onSubmit={handleSubmitLogin} >

                    <input
                        onChange={handleChange}
                        name='email'
                        value={email}
                        className='formControl'
                        placeholder='Email'
                        required />

                    <input
                        onChange={handleChange}
                        name='password'
                        value={password}
                        className='formControl'
                        placeholder='password'
                        required />

                    <div className='down_side_content' >
                        <div className='checkBox' >
                            <input type='checkbox' id='checkbox' /><label htmlFor='checkbox' >Keep me signed in</label>
                        </div>
                        <button type='submit' className='SignUp_button' >Sign In</button>
                        <Link>Forgot password?</Link>
                        <p className='signIn_Question' >Do not have an account? <span><Link to={"/SignUp"} className='signIn_Question_Link' >Sign Up</Link></span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn