import { FileDownload } from "js-file-download";
import axios from "axios";
import React from "react";
const AllNotices = ({notices}) =>{

    const download = async(id)=>{
    try {
        const res = await axios.get(
            `http://localhost:9002/api/uploadNotice/${id}`,
            {responseType:'blob'},
        )
        const blob = new Blob([res.data], {type: res.data.type})
        const link =document.createElement('a')
        link.href=window.URL.createObjectURL(blob)
        // link.download=res.headers['content-disposition'].split('filename=')[1]
        link.download="file.pdf"
        link.click()    
    } catch(error) {
        console.log(error)
    }
    }

    return(
        <>
            <tr>
                <td>{notices.department}</td>
                <td>{notices.name}</td>
                <td><button className="button" onClick={() => download(notices._id)}>download</button></td>
            </tr>
        </>
    )
}
export default AllNotices