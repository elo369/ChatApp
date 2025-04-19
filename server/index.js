import {app,server} from "./socket/socket.js"
import express from "express"
import { connectdb } from "./db/connectdb.js"
import useRouter from "./routes/user.router.js"
import messageRouter from "./routes/message.router.js"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.middleware.js"
import cors from "cors"
connectdb()
const PORT = process.env.PORT || 5000

app.use(
    cors({
      origin: ["https://chat-app-c7pz.vercel.app",process.env.CLIENT_URL],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/user",useRouter)
app.use("/api/v1/message",messageRouter)
app.use(errorMiddleware);

app.get("/",(req,res)=>{
  res.send({
    activeStatus:true,
    error:false
})
})

app.get("/test", (req, res) => {
  res.send("Test route working!");
});


server.listen(PORT,()=>{
    console.log(`server run on port ${PORT},${process.env.CLIENT_URL}`)
})