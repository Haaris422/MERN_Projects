import React, {useEffect, useState} from "react";
import axios from "axios"
import {Link, useParams, useNavigate} from "react-router-dom"
import Papa from "papaparse"
import "./forms.css"
const Auxilary = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        async function fetchData() {
        const res = await axios.post(
        'http://localhost:9002/aux',
        formData,
        );
        console.log(res.data);
        }
        fetchData();
    };

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

    return(
        <div>
            <form onSubmit={handleSubmit} className="notice-form">
                <h3>Auxilary Info</h3>
                    <label for="file">Upload Student Auxilary Info:</label>
                    <input type="file" name="file" id="file" accept=".csv" onChange={handleOnChange}></input>
                    <button className="button" type="submit" >Submit</button>
                    <Link to="/"> <button className="button">Back to Dashboard</button></Link>
            </form>
            <table className="stds">
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
    )

}

export default Auxilary