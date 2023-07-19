import React from "react"
// import { useLocation } from 'react-router-dom'
// import RegisterForm from "../components/RegisterForm"
import LoginForm from "../components/LoginForm"
import { useLocation } from "react-router-dom"
// import { 
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     useRouteMatch
// } from "react-router-dom"
// import SearchBar from "../components/SearchBar"

function LoginPage({ handleLogin }) {
    let location = useLocation()
    // console.log(props)
    return (
        <div>
            <h4>Member {location.pathname}</h4>
            <LoginForm isLogin={location.pathname === "/login"} handleLogin={handleLogin}/>

        </div>
    )
}

export default LoginPage