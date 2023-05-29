import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Login = ( { setLoginUser }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: "",
        })

    const handleChange = e => {
    const {name,value} = e.target
    setUser({
        ...user,
        [name]: value
    })
    }

    const login = () => {
        axios.post("http://localhost:9002/login", user)
        .then(res => {
            alert(res.data.message)
            setLoginUser(res.data.user)
            navigate("/")
        })
    }

    return (
        <div className="login">
            {console.log("User", user)}
            <h1>Log-in</h1>
            <input type="text" name="email" vale={user.email} onChange={handleChange} placeholder="Alotted E-mail"></input>
            <input type="password" name="password" vale={user.password} onChange={handleChange} placeholder="Password"></input>
            <div className="button" onClick={login}>Log-in</div>
            <div>Or</div>
            <div className="button" onClick={() => navigate("/stdLogin")}>Student Login</div>
        </div>
    )
}

export default Login