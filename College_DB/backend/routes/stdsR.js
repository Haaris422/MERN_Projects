var express = require('express')
const router = express.Router()
const {
    createStudent,
    getStudents,
    getStudent,
    deleteStudent,
    updateStudent
} = require('../controllers/stdsC')

router.post('/', createStudent)

router.get('/', getStudents)

router.get('/:id', getStudent)

router.delete('/:id', deleteStudent)

router.put('/:id', updateStudent)

module.exports = router