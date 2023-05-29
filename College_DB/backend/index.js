var express = require('express')
var cors = require('cors')
var mongoose = require('mongoose')
require("dotenv").config();

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/usersDB", {
    useNewUrlParser: true,
    useUnifiedTopology:true
}, () => {
    console.log("DB Connected")
})

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const User = new mongoose.model("User", userSchema)


//Routes
app.post("/login" , (req, res) => {
    const {email, password} = req.body
    User.findOne({email:email}, (err, user) => {
        if(user){
            if (password === user.password){
                res.send({message: "Logged In", user: user})
            } else {
                res.send({message: "Invalid password"})
            }
        } else {
            res.send({message: "User not Registered"})
        }
    })
})

app.post("/register" , (req, res) => {
    const { name, email, password} = req.body
    User.findOne({emil:email}, (err, user) => {
        if(user){
            res.send({message: "Already Registered"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send({message: "Regitered, woho"})
                }
            })
        }
    })
    
})

var bodyParser = require('body-parser');
var multer = require('multer');
var csv = require('csvtojson');
var upload = multer({ dest: './public/uploads' });
var Stds = require('./models/stds')
const path = require('path')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname,'public')))
app.get('/', (req, res) => {
    Stds.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ items: items });
        }
    });
});

app.post('/upload', upload.single('file'), (req, res, next) => {
    csv()
    .fromFile(req.file.path)
    .then((jsonObj)=>{
        
        var csv = [];
        
        for(var i = 0;i<jsonObj.length;i++){
            var obj={};
            obj.enNo=jsonObj[i]['EnNo'];
            obj.name=jsonObj[i]['Name'];
            obj.department=jsonObj[i]['Department'];
            obj.course=jsonObj[i]['Course'];
            obj.batch=jsonObj[i]['Batch'];
            obj.sec=jsonObj[i]['Sec'];
            csv.push(obj)
        }
        // console.log(csv)
        let final = []
        for(let i = 0; i < csv.length; i++){
            
            if(Stds.findOne({enNo:csv[i].enNo})){
                console.log("Already registered")
            }
            else{
                final.push(csv)
                
            }
            
        }
        console.log(final)
        Stds.insertMany(csv).then(function(){
            res.status(200).send({
                message: "Successfully Uploaded!"
            });
        }).catch(function(error){
            res.status(500).send({
                message: "failure",
                error
            });
        });
    }).catch((error) => {
        res.status(500).send({
            message: "failure",
            error
        });
    })
});


var Aux = require("./models/aux")
app.post('/aux', upload.single('file'), (req, res, next) => {
    csv()
    .fromFile(req.file.path)
    .then((jsonObj)=>{
        var csv = [];
        for(var i = 0;i<jsonObj.length;i++){
            var obj={};
            obj.enNo=jsonObj[i]['EnNo.'];
            obj.fName=jsonObj[i]['Fathers Name'];
            obj.feeSlip1=jsonObj[i]['Fee Slip Sem 1'];
            obj.feeSlip2=jsonObj[i]['Fee Slip Sem 2'];
            obj.feeSlip3=jsonObj[i]['Fee Slip Sem 3'];
            obj.feeSlip4=jsonObj[i]['Fee Slip Sem 4'];
            obj.feeSlip5=jsonObj[i]['Fee Slip Sem 5'];
            obj.feeSlip6=jsonObj[i]['Fee Slip Sem 6'];
            obj.feeSlip7=jsonObj[i]['Fee Slip Sem 7'];
            obj.feeSlip8=jsonObj[i]['Fee Slip Sem 8'];
            obj.libCard=jsonObj[i]['Library Card'];
            obj.idCard=jsonObj[i]['ID Card'];
            obj.latE=jsonObj[i]['Lateral Entry'];
            csv.push(obj);
        }
        Aux.insertMany(csv).then(function(){
            res.status(200).send({
                message: "Successfully Uploaded!"
            });
        }).catch(function(error){
            res.status(500).send({
                message: "failure",
                error
            });
        });
    }).catch((error) => {
        res.status(500).send({
            message: "failure",
            error
        });
    })
});
const generateToken = require('./util/generateToken')

app.post("/stdLogin" , (req, res) => {
    const {name, password} = req.body
    Stds.findOne({name:name}, (err, stds) => {
        if(stds){
            if (password === stds.enNo){
                res.send({message: "Logged In", stds:stds, token:generateToken(stds._id)})
            } else {
                res.send({message: "Invalid password"})
            }
        } else {
            res.send({message: "Student not Registered"})
        }
    })
})


const stdsRoutes = require('./routes/stdsR')
app.use(express.static("public/uploads"))
app.use('/api/students', stdsRoutes)
const userRoutes = require('./routes/userRoute')
app.use('/api/storeImg', userRoutes)
const noticeRoutes = require('./routes/noticeR')
app.use('/api/uploadNotice', noticeRoutes)
app.use(express.static("public/uploads/noticeF"))
const AuxRoutes = require('./routes/auxR')
app.use('/api/auxR', AuxRoutes)
app.use(express.static("public/uploads/auxR"))



app.listen(9002, () => {
    console.log("DB Started @ 9002")
})
