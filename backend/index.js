const connecttodata=require('./db')
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')
connecttodata()

app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})