import React, { useState, useEffect } from "react"
import "./forms.css"
import axios from "axios"
import {Link} from "react-router-dom"

const NoticeUpload = () => {

    const [newCreds, setCreds] = useState({
        name: '',
        notice: '',
        department: '',
    })
    const handleFile = (e) => {
        setCreds({ ...newCreds, notice: e.target.files[0] })
        console.log(newCreds.notice)
    }
    const handleOnChange = (e) => {
        setCreds({ ...newCreds, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', newCreds.name)
        formData.append('myfile', newCreds.notice)
        formData.append('department', newCreds.department)
        console.log(newCreds)
        axios.post("http://localhost:9002/api/uploadNotice", formData)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            
            <form onSubmit={handleSubmit} className="notice-form" encType="multipart/form-data">
            <h2>Upload New Notice</h2>
                <input type="text" name="name" placeholder="Enter File Name" onChange={handleOnChange}></input>
                <input type="file" name="myfile" accept=".pdf" placeholder="Select File" onChange={handleFile}></input>
                <input type="text" name="department" placeholder="Department Name" onChange={handleOnChange}></input>
                <button className="button" type="submit">Upload</button>
                <Link to="/"> <button className="button">Back to Dashboard</button></Link>
            </form>
                
        </div>
    )
}

export default NoticeUpload