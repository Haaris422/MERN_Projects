import React, { useState, useEffect } from 'react'
import "../homepage/homepage.css"
import { Container, Card, Form } from 'react-bootstrap'
import axios from "axios"
import AllNotices from '../components/allNotices'
import { Link } from 'react-router-dom'
const StdN = () => {
    const [notices, setNotices] = useState(null)
    const fetchNotices = async () => {
        const response = await fetch('http://localhost:9002/api/uploadNotice/getNotices')
        const json = await response.json()
        if (response.ok) {
            setNotices(json)
            console.log(notices)
        }
    }


    return(
        <div className='hp'>
            <h1>Notices</h1>
            <button className="button" onClick={fetchNotices}>All</button>
            <div className='tablewrap'>
            <table>
                <thead>
                    <tr>
                        <th>Department</th>
                        <th>Notice</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    {notices && notices.map((notices => (
                    <AllNotices key = {notices._id} notices={notices}/>
                    )))}
                </tbody>
            </table>
            
            </div>
            <Link to="/stdHomepage"> <button className='button'>Back to Dashboard</button></Link>         
            
        </div>
        
    )
}

export default StdN