import React, { useState, useEffect } from 'react'
import { Container, Card, Form } from 'react-bootstrap'
import axios from "axios"
import { Link, useOutlet } from 'react-router-dom'
import "./card.css"
import Navb from '../extras/nav'
const StdHomepage = ({ updateStd }) => {



    let info = JSON.parse(localStorage.getItem('LoggedIn'))
    let enroll = info.enNo
    const [newCreds, setCreds] = useState({
        enNo: `${enroll}`,
        pp: '',
        libCard: '',
        idCard: ''
    })
    const handlePhoto = (e) => {
        setCreds({ ...newCreds, pp: e.target.files[0] })
        console.log(newCreds.pp)
    }
    const handlePhoto1 = (e) => {
        setCreds({ ...newCreds, libCard: e.target.files[0] })
        console.log(newCreds.libCard)
    }
    const handlePhoto2 = (e) => {
        setCreds({ ...newCreds, idCard: e.target.files[0] })
        console.log(newCreds.idCard)
    }
    // const handleOnChange = (e) => {
    //     setCreds({ ...newCreds, [e.target.name]: e.target.value })
    // }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', newCreds.pp)
        formData.append('enNo', newCreds.enNo)
        formData.append('photo1', newCreds.libCard)
        formData.append('photo2', newCreds.idCard)
        console.log(newCreds)
        axios.post("http://localhost:9002/api/storeImg", formData)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    
    const [aux, setAux] = useState(null)
    
    const fetchAux = async () => {
        const enNo = enroll
        const response = await fetch(`http://localhost:9002/api/auxR/${enNo}`)
        const json = await response.json()
        if (response.ok) {
            setAux(json)
            console.log(aux)
        }
    }
    
   
    const [uploads, setUploads] = useState(null)
    
        const fetchUploads = async () => {
            const enNo = enroll
            const response = await fetch(`http://localhost:9002/api/storeImg/single/${enNo}`)
            const json = await response.json()
            if (response.ok) {
                setUploads(json)
                console.log(uploads)
            }
        }
    
        if (aux){
            let localAdd = "http://localhost:9002/uploads/"
            let img1url= localAdd + uploads.libCard
            let img2url= localAdd + uploads.idCard
            return (
                    <div className='container'>
                        <div className='profile-box'>
                            <div>
                                <h2>Library & ID Cards</h2>
                                <img src={img1url} className='extra-pic' alt="Student-Profile-Pic"width="150" height="200"></img>
                                <img src={img2url} alt="Student-Profile-Pic" className='extra-pic' width="150" height="200"></img>
                            </div>
                            
                            <h3>Father's Name: {aux.fName}</h3>
                            
                            <h5>Fee Status Sem 1: {aux.feeSlip1}</h5>
                            <h5>Fee Status Sem 2: {aux.feeSlip2}</h5>
                            <h5>Fee Status Sem 3: {aux.feeSlip3}</h5>
                            <h5>Fee Status Sem 4: {aux.feeSlip4}</h5>
                            <h5>Fee Status Sem 5: {aux.feeSlip5}</h5>
                            <h5>Fee Status Sem 6: {aux.feeSlip6}</h5>
                            <h5>Fee Status Sem 7: {aux.feeSlip7}</h5>
                            <h5>Fee Status Sem 8: {aux.feeSlip8}</h5>
                            <div className='profile-bottom'>
                               <Link to="/stdN"> <button className='button'>Notices</button></Link>
                            </div>
                        </div>
                        
                    </div>
                )
        }

    if (uploads){
        let localAdd = "http://localhost:9002/uploads/"
        let imgUrl = localAdd + uploads.pp
        
        return (
                <div className='container'>
                    <div className='profile-box'>
                        <img src={imgUrl} className="profile-pic"></img>
                        <h2>{info.name}</h2>
                        <div className='infos'>
                            <p>{info.enNo}</p>
                            <p>Department: {info.department}</p>
                            <p>Course: {info.course}</p>
                            <p>Sec: {info.sec}</p>
                        </div>
                        
                        <div className='profile-bottom'>
                            <button className='button' onClick={fetchAux}>More Info</button>
                        </div>
                    </div>
                </div>                
            )
        }
        function showField() {
            var x = document.getElementById("upForm")
            if (x.style.display === "none") {
                x.style.display = "flex";
              } else {
                x.style.display = "none";
              }
            
            // document.getElementById("view").style.display = "none";
            
        }    
return (
        
        <div >
            <div>
            
            </div>
            
            <div className='hp'>
                <div>
                <h1>Dashboard</h1>
                </div>
                
                <button className="button" onClick={() => showField({})}>Upload</button>
                <form onSubmit={handleSubmit} id="upForm" style={{display:'none'}} className="notice-form" encType="multipart/form-data">
                    <label>Upload Profile Picture: </label>
                    <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={handlePhoto} />
                    
                    <label>Upload Library Card: </label>
                    <input type="file" accept=".png, .jpg, .jpeg" name="photo1" onChange={handlePhoto1} />
                    <label>Upload ID Card: </label>
                    <input type="file" accept=".png, .jpg, .jpeg" name="photo2" onChange={handlePhoto2} />
                    
                    <button class="button" type='submit'>Submit</button>
                </form>
                
                <button class="button" onClick={fetchUploads}>Details</button>
                
                <Link to="/stdN"><button class="button">Notices</button></Link>
                <button class="button" onClick={() => updateStd({})}>Log-Out</button>
            </div>
            
        </div>

    )
}
export default StdHomepage