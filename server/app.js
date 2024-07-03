const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./Routes/auth')

const port = 5000;
app.use(cors({
    // origin: ['http://localhost:5173'],
    // origin: ['https://make-friends-seven.vercel.app/'],
    origin: [""],
    method: ['GET','POST','DELETE','PUT'],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/auth',userRouter)

// mongoose.connect("mongodb://127.0.0.1:27017/newFriend")
mongoose.connect("mongodb+srv://zulqarnainc:haider@cluster0.nlftiui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("connected successfully");
}).catch(err => console.log(err))

app.get("/", (req,res) => {
    res.json("Hello World")
})


app.listen(port, () => {
    console.log("server is still listening at port no 5000");
})
