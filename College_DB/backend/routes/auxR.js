const express = require('express')
const router = express.Router()
const AuxModel = require("../models/aux")

router.get('/:enNo', async(req, res) => {
    const aux = await AuxModel.findOne({enNo:req.params.enNo})
    .then((aux) => {
        res.status(200).json(aux)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
   
})

router.get('/', async (req, res) => {
    const aux = await AuxModel.find({}).sort({createdAt: -1})
        res.status(200).json(aux)
    })
module.exports = router