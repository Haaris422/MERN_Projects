import axios from "axios"

const Records = ({student}) => {

    const updateStd = (_id) => {
        const newname = prompt("Enter new Name: ")
        axios.put("http://localhost:9002/api/students/:id", {newname: newname, id: _id})
        
    }
    
    const deleteStd = (_id) => {
        axios.delete("http://localhost:9002/api/students/delete")
    }

    return(
        <>
            <tr>
                <td>{student.enNo}</td> 
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.course}</td>
                <td>{student.batch}</td>
                <td>{student.sec}</td>  
                <button className="button" onClick={() => updateStd(student._id)}>Update</button>
                <button className="button" onClick={() => deleteStd(student._id)}>Delete</button>
            </tr> 
        </>
    )
}

export default Records