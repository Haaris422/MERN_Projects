const Student = require('../models/stds')
const mongoose = require('mongoose')
//get all students
const getStudents = async (req, res) => {
    const students = await Student.find({}).sort({createdAt: -1})
        res.status(200).json(students)
    }


//get student 
const getStudent = async(req, res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'Student Not Found'})
    }

    const student = await Student.findById(id)
    
    if(!student){
        return res.status(404).json({error:'Student not found'})
    }
    res.status(200).json(student)
}

//add individual student
const createStudent = async(req, res) => {
        const { enNo, name, department, course, batch, sec} = req.body

    Student.findOne({enNo:enNo}, (err, std) => {
        if(std){
            res.send({message: "Already Registered"})
        } else {
            const std = new Student({
                enNo,
                name,
                department,
                course,
                batch,
                sec
            })
            std.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send({message: "Regitered, woho"})
                }
            })
        }
    })
    
}
//delete student
const deleteStudent = async(req,res) => {
    const {id} = req.params
    await Student.findByIdAndRemove(id).exec()

    res.send("Deleted")
}

//update student info
const updateStudent = async(req, res) => {
    const id = req.body.id
    const newname = req.body.newname
    console.log(newname, id)
    try {
            await Student.findById(id, (error, stdToUpdate) => {
                stdToUpdate.name = newname
                stdToUpdate.save()
            })
    } catch(err){
        console.log(err)
    }
    res.send("Updated")
   
}
module.exports = {
    createStudent,
    getStudents,
    getStudent,
    deleteStudent,
    updateStudent,
}