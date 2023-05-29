const express = require('express')
const router = express.Router()
// const uploadMiddleware = require("../middleware/multermw")
const UploadModel = require("../models/photos")
const multer = require("multer")
const {v4: uuidv4} = require("uuid")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/uploads")
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4()+'-'+Date.now()+path.extname(file.originalname))
    } 
})
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"]
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true)
    }else {
        cb(null, false)
    }
}

// router.post("/", uploadMiddleware.single("photo"), (req, res) => {
    
//     UploadModel.findOne({enNo:req.body.enNo}, (err, upload) => {
//         if(upload){
//              res.send({message: "Alredy Uploaded"})
//         } else {
//             const userPhotos = new UploadModel({
//                 enNo: req.body.enNo,
//                 pp: req.file.filename,
//             })
//             userPhotos.save()
//             res.json('photos Added')
//         }
//     })   
// })

const uploadMiddleware = multer({storage: storage, fileFilter:fileFilter})
router.post("/", uploadMiddleware.fields([{name:"photo", maxCount:1}, {name:"photo1", maxCount:1}, {name:"photo2", maxCount:1} ]), (req, res) => {
    
    UploadModel.findOne({enNo:req.body.enNo}, (err, upload) => {
        if(upload){
             res.send({message: "Alredy Uploaded"})
        } else {
            const userPhotos = new UploadModel({
                enNo: req.body.enNo,
                pp: req.files.photo[0].filename,
                libCard:req.files.photo1[0].filename,
                idCard:req.files.photo2[0].filename
            })
            userPhotos.save()
            res.json('photos Added')
        }
    })
    
     
    
})

router.get('/getUploads', async (req, res) => {
    const uploads = await UploadModel.find({}).sort({createdAt: -1})
        res.status(200).json(uploads)
    })

router.get('/single/:enNo', async(req, res, next) => {
    
    const uploads = await UploadModel.findOne({enNo:req.params.enNo})
    .then((uploads) => {
        res.status(200).json(uploads)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

router.route('/rec').get((req, res) => {
    UploadModel.find()
    .then(userPhotos => res.json(userPhotos))
    .catch(err => res.status(400).json('Error: ' + err))
})
module.exports=router