const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./Routes/auth')

const port = 5000;
app.use(cors({
    origin: ['https://make-friends-sigma.vercel.app/'],
    method: ['GET','POST','DELETE','PUT'],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/auth',userRouter)

mongoose.connect("mongodb+srv://zulqarnainc:haider@cluster0.nlftiui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("connected successfully");
}).catch(err => console.log(err))


app.listen(port, () => {
    console.log("server is still listening at port no 5000");
})
