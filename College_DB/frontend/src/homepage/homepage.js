import React, { useState, useEffect } from "react"
import "./homepage.css"
import axios from "axios"
import Papa from "papaparse"
import {Link} from "react-router-dom"
import Records from '../components/recordList'

const Homepage = ({setLoginUser}) => {
    function showField() {
        var x = document.getElementById("batchfield")
        if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
        
        document.getElementById("view").style.display = "none";
        
    }

    function showField2() {
        document.getElementById("batchfield").style.display = "none";
        
        var x = document.getElementById("view")
        
        if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
    }
   
    
    const [parsedData, setParsedData] = useState([]);

  
    const [tableRows, setTableRows] = useState([]);

    const [values, setValues] = useState([]);

    const [csvFile, setCsvFile] = useState();

    const formData = new FormData();
    if (csvFile){
        formData.append('file', csvFile);
        }
    const handleOnChange = (e) => {
        if (e.currentTarget.files) setCsvFile(e.currentTarget.files[0]);
        Papa.parse(e.target.files[0], {
            header: true,
            skipEmptyLine:true,
            complete: function(results) {
                const rowsArray = [];
                const valuesArray = [];
                results.data.map((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d))
                })
                setParsedData(results.data);
                setTableRows(rowsArray[0]);
                setValues(valuesArray);
            }
        });
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();

        async function fetchData() {
        const res = await axios.post(
        'http://localhost:9002/upload',
        formData,
        );
        console.log(res.data);
        }
        fetchData();
    };
    
    const [students, setStudents] = useState(null)
    useEffect(() => {
        const fetchStds = async() => {
            const response = await fetch('http://localhost:9002/api/students/')
            const json = await response.json()
            if (response.ok) {
                setStudents(json)
            }
        }
        fetchStds()
    }, [])
   

    return( 
        <div className="hp">
            <h1>Hello Admin</h1>
            <div className="button" onClick={() => showField({})} id="batch">Add Batch</div>
            {/* <div className="button" onClick={()=>setLoginUser({})} id="login">Log out</div> */}
            <div style={{display:'none'}} id="batchfield">
                <form onSubmit={handleSubmit}>
                    <label for="file">Upload Student Info:</label>
                    <input type="file" name="file" id="file" accept=".csv" onChange={handleOnChange}></input>
                    <button className="button" type="submit" >Submit</button>
                </form>
                <div className="tablewrap">
                <table>
                    <thead>
                    <tr>
                        {tableRows.map((rows, index) => {
                        return <th key={index}>{rows}</th>;
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {values.map((value, index) => {
                        return (
                            <>
                                <tr key={index}>
                                    {value.map((val, i) => {
                                    return <td key={i}>{val}</td>;
                                    })}
                                </tr>
                                
                            </>
                        );
                    })}
                    </tbody>
                </table>
                </div>
                
            </div>
            <button className="button" onClick={() => showField2({})}>Show All Students</button>
            <div id="view" style={{display:'none'}} className="tablewrap">
                <table>
                <thead>
                    <tr>
                        <th>EnNo</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Course</th>
                        <th>Batch</th>
                        <th>Sec</th>
                        <th>Operations</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {students && students.map((student) => 
                        <Records key={student._id} student={student}/> 
                    )}
                </tbody>
                </table>
            </div>
            
            <Link to="/single"> <button className="button">Single Student</button></Link>
            <Link to="/auxilary"> <button className="button">Add Auxilary Infomation</button></Link>    
            <Link to="/noticesUp"> <button className="button">Notices</button></Link>
            <div className="button" onClick={() => setLoginUser({})}>Log Out</div>       
        </div>
    )
}

export default Homepage