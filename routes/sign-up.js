const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('sing-up')
})

router.post('/',(req,res)=>{
    res.redirect('/')
})

module.exports = router