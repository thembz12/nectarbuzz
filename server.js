const express = require ("express")
require ("./config/databaseConfig.js")
const ProductRouter = require ("./routers/ProductRouter.js")
const router = require ("./routers/UserRouter.js")
const FarmerRouter = require ("./routers/FarmerRouter.js")
const categoryRouter = require ("./routers/CategoryRouter.js")
const cartRouter = require ("./routers/CartRouter.js")
const app = express()
const cors = require ("cors")
app.use(express.json())

app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use("/api/v1", router)
app.use("/api/v1/farmer/",FarmerRouter)
app.use("/api/v1",ProductRouter)
app.use("/api/v1",categoryRouter)
app.use("/api/v1",cartRouter)




 
app.get("/", (req,res)=>{
    res.status(200).json({
        message:"WELCOME   TO NECTAR-BUZZ"
    })
})

const port = process.env.port || 1239

app.listen(port,()=>{
    console.log("server is listening to", port);
    
})
