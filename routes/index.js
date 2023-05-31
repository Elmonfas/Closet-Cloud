const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    if(req.session.loggead != true){
        res.redirect('/')
    }else{
        res.render('index')
    }
})

module.exports = router