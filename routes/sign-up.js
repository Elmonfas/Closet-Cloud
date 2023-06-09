const express = require('express')
const router = express.Router()

const pool = require('../database/db')

router.get('/',(req,res)=>{
    if(req.session.loggead){
        console.log(req.session.loggead);
        res.redirect('main')
    }else{
        console.log(req.session.loggead);
        res.render('sing-up')
    }
})

router.post('/',(req,res)=>{
    const name = req.body.name
    const nickname = req.body.nickname
    const email = req.body.email
    const password = req.body.password
    const verifyPassword = req.body.verifyPassword

    if(name == '' | nickname == '' | email == '' | password == '' | verifyPassword == ''){   
        res.render('sing-up',{
            alert:true,
            alertTitle:"Formulario no completado",
            alertMessage:"Por favor rellene todos los campos para poder registrarse",
            alertIcon:'error',
            showConfirmButton:false,
            time:1500,
            ruta:'sign-up'
        })
    }else if(password != verifyPassword){
        res.render('sing-up',{
            alert:true,
            alertTitle:"Error de autenticación",
            alertMessage:"Las contraseñas no coinciden, por favor vuelva a intentarlo.",
            alertIcon:'error',
            showConfirmButton:false,
            time:1500,
            ruta:'sign-up'
        }) 
    }else{
        pool.query('insert into users set ?',{user_name:name,user_nickname:nickname,user_email:email,user_pass:password},(error,response)=>{
            if(error){
                console.log(error);
                res.render('sing-up',{
                    alert:true,
                    alertTitle:"Error de creación de usuario",
                    alertMessage:"Por favor vuelva a intentarlo",
                    alertIcon:'error',
                    showConfirmButton:false,
                    time:1500,
                    ruta:'sign-up'
                })
            }else{
                res.render('sing-up',{
                    alert:true,
                    alertTitle:"Usuario registrado",
                    alertMessage:"",
                    alertIcon:'success',
                    showConfirmButton:false,
                    time:1500,
                    ruta:''
                })
            }
        })
    }
})

module.exports = router