import React, {useState} from "react";
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import "./forms.css"

const Single = (props) => {

  const navigate = useNavigate()

  

  const [stds, setStd] = useState({
    enNo: "",
    name: "",
    department: "",
    course: "",
    batch: "",
    sec: ""
  })

  const handleChange = (e) => {
    const {name,value} = e.target
    setStd({
        ...stds,
        [name]: value
    })
  }

  const add_std = () => {
    const { enNo, name, department, course, batch, sec} = stds
    if (enNo && name && department && course && batch && sec){
         axios.post("http://localhost:9002/api/students/", stds)
         .then(res => {
             alert(res.data.message)
             navigate("/")
         })
    } else {
     alert("Invalid")
    }
  }  
  return (
    <div className="notice-form">
      <h2>Add Single Student</h2>
      <input type="text" name="enNo" value={stds.enNo} placeholder="Enrollment No." onChange={handleChange}></input>
      <input type="text" name="name" value={stds.name} placeholder="Name" onChange={handleChange}></input>
      <input type="text" name="department" value={stds.department} placeholder="Department" onChange={handleChange}></input>
      <input type="text" name="course" value={stds.course} placeholder="Course" onChange={handleChange}></input>
      <input type="text" name="batch" value={stds.batch} placeholder="Batch" onChange={handleChange}></input>
      <input type="text" name="sec" value={stds.sec} placeholder="Sec" onChange={handleChange}></input>     
      <div className="button" onClick={add_std}>Add Student</div>
      <Link to="/"> <button className="button">Back to Dashboard</button></Link>
    </div>
  );
};
  
export default Single