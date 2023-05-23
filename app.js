const express = require('express')
const app = express()


app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/resource',express.static('public'))

app.use('/resource',express.static(__dirname+'/public'))

app.use('/views',express.static('views'))

app.use('/views',express.static(__dirname+'/views'))

app.set('view engine','ejs')

app.use('/',require('./routes/login.js'))

app.use('/main',require('./routes/index.js'))

app.listen(3000,(req,res)=>{
    console.log('SERVER RUNNING IN PORT:https://localhost:3000');
})
