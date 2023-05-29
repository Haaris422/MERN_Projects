const express = require('express')
const router = express.Router()
const multer = require("multer")
const {v4: uuidv4} = require("uuid")
const path = require("path")
const NoticeModel = require('../models/noticesM')
const { ErrorResponse } = require('@remix-run/router')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/uploads/noticeF")
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4()+'-'+Date.now()+path.extname(file.originalname))
    } 
})

const uploadMiddleware = multer({storage: storage})

router.post("/", uploadMiddleware.single("myfile"), (req, res) => {
    
    const notices = new NoticeModel({
        name: req.body.name,
        notice: req.file.filename,
        department: req.body.department
    })
    
    notices.save()
    .then(() => res.json('Notice Added'))
    .catch(err => res.status(400).json('Error: ' + err)) 
})

router.get('/getNotices', async (req, res) => {
    const notices = await NoticeModel.find({}).sort({createdAt: -1})
        res.status(200).json(notices)
    })

router.get('/:id', async(req, res) => {
    const {id} = req.params
    const notices = await NoticeModel.findById(id)
    if (!notices){
        return next(new ErrorResponse("No"))
    }
    const file = notices.notice
    const filePath = path.join(__dirname, `../public/uploads/noticeF/${file}`)
    res.download(filePath)
})
module.exports = router