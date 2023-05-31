const express = require('express')
const pool = require('../database/db')
const router = express.Router()

router.get('/',(req,res)=>{
    if(req.session.loggead == true){
        console.log(req.session.loggead);
        res.redirect('main')
    }else{
        console.log(req.session.loggead);
        res.render('login')
    }
})


router.post('/',(req,res)=>{
    const nickname = req.body.nickname
    const password = req.body.password

    if(nickname == '' || password == ''){
        res.render('login',{
            alert:true,
            alertTitle:"Formulario no completado",
            alertMessage:"Por favor rellene todos los campos para poder iniciar sesión",
            alertIcon:'error',
            showConfirmButton:false,
            time:1500,
            ruta:'/'
        })
    }else{
        pool.query(`select id_user from users where user_nickname = ? and user_pass = ?`,[nickname,password],(error,response)=>{
            if(error){
                res.render('login',{
                    alert:true,
                    alertTitle:"Algo a salido mal...",
                    alertMessage:"Problema al verificar la cuenta, por favor vuelva a intentarlo",
                    alertIcon:'error',
                    showConfirmButton:false,
                    time:1500,
                    ruta:'/'
                })
            }else if(response.length == 0){
                res.render('login',{
                    alert:true,
                    alertTitle:"No se ha encontrado el usuario",
                    alertMessage:"Cuenta no existente, por favor ingrese un usuario registrado.",
                    alertIcon:'error',
                    showConfirmButton:false,
                    time:1500,
                    ruta:'/'
                })
            }else{
                req.session.loggead = true
                req.session.name = response[0].id_user
                console.log(req.session.name);
                res.redirect('main')
            }
        })
    }
})

module.exports = router