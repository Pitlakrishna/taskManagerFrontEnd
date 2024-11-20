import React, { useState } from 'react';
import AuthHeader from '../Auth_Header/Auth_Header';
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialGooglePlus } from "react-icons/ti";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import "./Sign_Up.css";
import axios from "axios";

const SignUp = () => {
    const [isError, SetIsError] = useState({ msg: "", status: false });
    const [loading, SetLoading] = useState(false);

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
    })

    const { userName, email, password } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }
    }

    const handleSubmitFormData = async (e) => {
        SetLoading(true)
        SetIsError({ msg: false })
        e.preventDefault();
        try {
            SetLoading(false)
            SetIsError({ msg: false })
            validateEmail(email)
            const res = await axios.post(`https://backendtaskmanger.onrender.com/api/v1/auth/register`, formData);
            if (res && res.data.success) {
                toast.success("Succesfully Registered..");
                setFormData({
                    userName: "", email: "", password: ""
                })
                setTimeout(navigate("/Signin"), 2000)
            } else {
                toast.error("Error in Registration...");
            }
        } catch (error) {
            SetLoading(false)
            SetIsError({ msg: true })
            toast.error(error.message || "Somthing went wrong...");
        }
    }

    return (
        <div>
            <AuthHeader />
            <div className='signUpContainer' >
                <button className='btn-primary formControl button '><span className='socialButton' ><TiSocialFacebook /></span> Sign up with Facebook</button>
                <button className='btn-danger formControl mt-n3 button'><span className='socialButton' ><TiSocialGooglePlus /></span> Sign up with Google+</button>
                <p>OR</p>
                <form onSubmit={handleSubmitFormData} >

                    <input
                        onChange={handleChange} // onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        value={email}
                        className='formControl'
                        placeholder='Email'
                        required />
                    <input
                        onChange={handleChange} // onChange={(e) => setPassword(e.target.value)}
                        name='password'
                        value={password}
                        className='formControl'
                        placeholder='password'
                        required />

                    <div className='down_side_content' >
                        <p className='text-muted terms text-center' >
                            <span className='text-secondary' >By clicking Sign Up, I agree to the</span>
                            Terms of service and Policy Privacy.
                        </p>
                        <button type='submit' className='SignUp_button' >Sign Up</button>
                        <p className='signIn_Question' >Already have an account? <span  ><Link to={"/Signin"} className='signIn_Question_span' >Sign in</Link></span></p>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default SignUp