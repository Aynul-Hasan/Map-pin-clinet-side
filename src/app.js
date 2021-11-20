const express= require('express')
const app = express();
require('dotenv').config()
require('./db/database')
const port= process.env.PORT ||5000
const cors= require('cors')


app.use(express.json())
app.use(cors())
app.use(require('./router/router'))

app.listen(port,()=>{
    console.log(`app is running at ${port}`)
})
