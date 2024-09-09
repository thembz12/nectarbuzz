const express = require ("express")
require ("./config/databaseConfig.js")
const ProductRouter = require ("./routers/ProductRouter.js")
const router = require ("./routers/UserRouter.js")
const FarmerRouter = require ("./routers/FarmerRouter.js")
const app = express()
app.use(express.json())


app.use('/uploads', express.static('uploads'))
app.use("/api/v1",router)
app.use("/api/v1",FarmerRouter)
app.use("/api/v1",ProductRouter)




 
app.get("/", (req,res)=>{
    res.status(200).json({
        message:"WELCOME TO NECTAR-BUZZ"
    })
})

const port = process.env.port || 1239

app.listen(port,()=>{
    console.log("server is listening to", port);
    
})
