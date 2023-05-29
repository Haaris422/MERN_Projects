const Image = require('../models/photos')

const storeImg = async(req,res) => {
    try {
        const{image} = req.body
        if(!image){
            return res.status(400).json({msg: "please enter an icon url"})
        }
        let newImage = new Image.photo({
            image,
        })
        newImage = await newImage.save()
        res.json(newImage)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

module.exports = {storeImg}