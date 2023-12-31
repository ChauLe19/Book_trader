import React, { Component, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import axios from 'axios'
import { server_url } from "../pages/global_vars";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";


function LoginForm(props) {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [message, setMessage] = useState("")
    const [passwordIsShown, setPasswordIsShown] = useState(false)
    const [isLoggedin, setIsLoggedIn] = useState(localStorage.getItem("token"))
    const navigate = useNavigate()

    if (isLoggedin) {
        return <Navigate to="/" />
    }
    return (

        <div className="login-container" style={{ minHeight: props.isLogin ? "" : 430}}>
            <div className="login-form">
                <h4>{props.isLogin ? "Sign in" : "Sign up"}</h4>
                {!props.isLogin &&
                    <TextField fullWidth id="username" label="Username" placeholder="Your username" onChange={
                        e => setUsername(e.target.value)} style={{margin: "0.25rem"}} required />
                }
                <TextField fullWidth id="email" label="Email" placeholder="Email" onChange={
                    e => setEmail(e.target.value)} style={{margin: "0.25rem"}} required />
                <TextField fullWidth id="password" type={passwordIsShown ? "text" : "password"} label="Password" placeholder="Password" onChange={
                    e => setPassword(e.target.value)} style={{margin: "0.25rem"}} required />
                {!props.isLogin &&
                    <TextField fullWidth id="repassword" type="password" label="Confirm Password" placeholder="Confirm password" onChange={
                        e => setRepassword(e.target.value)} style={{margin: "0.25rem"}} required />
                }

                <FormControlLabel
                    control={
                        <Checkbox checked={passwordIsShown} onChange={() => setPasswordIsShown(!passwordIsShown)} name="showPassword" />
                    }
                    label="Show Password"
                />
                <Button type="submit" variant="contained" style={{ backgroundColor: "#192A56" }} onClick={
                    props.isLogin ?
                        e => {
                            e.preventDefault()
                            axios.post(`${server_url}/login`, {
                                email, password
                            }, {
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Content-Type": "application/json"
                                }
                            }).then(data => {
                                console.log(data.data)
                                localStorage.setItem("token", data.data.token)
                                setIsLoggedIn(true)
                                props.handleLogin()
                            })
                                .catch(err => setMessage("Error has occured. Please check your email or password."))

                        } : e => {
                            e.preventDefault()
                            if (password !== repassword) throw new Error("Not same password")
                            axios.post(`${server_url}/signup`, {
                                email, password, username
                            }, {
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Content-Type": "application/json"
                                }
                            }).then(data => navigate("/login"))

                        }}> {props.isLogin ? "Login" : "Register"} </Button>
                <div className="error">
                    {message}
                </div>
                <div>
                    <a href={props.isLogin ? "/register" : "/login"}>{props.isLogin ? "Don't have an account?" : "Already have an account?"}</a>
                </div>
            </div>
        </div >
    )
}

export default LoginForm