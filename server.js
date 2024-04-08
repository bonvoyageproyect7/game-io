
const dotenv= require('dotenv');
dotenv.config({path:'./configg.env'});

const sendemail= require('./mailer/sendmail');
const express = require('express');
const routerAccount=require('./routers/userAccount.js');

const app = express();
const PORT=process.env.PORT || 3000;

app.use('/api/account',routerAccount);



app.get('/',(req,res)=>{

    sendemail.sendemail().then(vall =>{
        /*console.log(process.env.EMAIL_ADM);
        console.log(process.env.PASS_ADM);*/
        res.send(vall);
    })
    //res.send("hola");


});

console.log('hola q hacesssss');

app.listen(PORT, ()=>{
    console.log('servidor corriendo 2.1');
})

