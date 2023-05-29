import React, {useEffect, useState} from "react"
import "./login.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const StdLogin = ( { updateStd }) => {

    const navigate = useNavigate()

    const [stds, setStd] = useState({
        name: "",
        password: "",
        })

    const handleChange = e => {
        const {name,value} = e.target
        setStd({
            ...stds,
            [name]: value
        })
    }

    const login = async(e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    "Content-type":"application/json"
                }
            }
            const { data} = await axios.post("http://localhost:9002/stdLogin", stds, config)
            .then(res => {
                alert(res.data.message)
                updateStd(res.data.stds)
                navigate("/stdHomepage")
            })
            
        }catch(error){

        }

        
    }

    return (
        <div className="login">
            {console.log("Std", stds)}
            <h1>Student Log-in</h1>
            <input type="text" name="name" vale={stds.name} onChange={handleChange} placeholder="Student Name"></input>
            <input type="password" name="password" vale={stds.password} onChange={handleChange} placeholder="Password(Enrollment No.)"></input>
            <div className="button" onClick={login}>Log-in</div>
            <div>Or</div>
            <div className="button" onClick={() => navigate("/login")}>Admin Login</div>
        </div>
    )
}

export default StdLogin