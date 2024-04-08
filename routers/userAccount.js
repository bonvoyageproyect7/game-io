const express= require('express');
const mailer = require ('../mailer/sendmail');
const userData=require('../models/UsersData');
const  userAccount=require('../database/userAccount');
const { getResponseLoginData } = require('../models/RespModel');
const getResponseLogin=require('../models/RespModel').getResponseLogin;
const bcrypt= require('bcrypt');


const accountRouter= express.Router();
accountRouter.use(express.text());// body sra en json middleware

accountRouter.post('/signUp', async(req,res)=>{
    //obtienes el body enviadp y  lo conviertes en un json
    let newAccount = await JSON.parse (req.body);
    var num =   await Math.floor(Math.random()*(1000-9998+1)+9998);
    //mapeas datos del ususario creando un objecto ;
    var newPass = await bcrypt.hash (newAccount.password, 8);
    var sendAccount= await {
        email:newAccount.email,
        userName:newAccount.userName,
        password:newPass,//////////////////////////////
        status:false,
        privCode:num
    } 
    //haces el llamado a las promesas para realizar el registro del nuevo usuario 
    mailer.sendemail(sendAccount.email,sendAccount.privCode).then(()=>{
        userAccount.createAccount(sendAccount).then(()=>{
            //crear cuenta de inicio

            userAccount.createEmptyProgress(newAccount).then(()=>{
                res.send(JSON.parse(`{"error":${res.statusCode},"description":"ok"}`));

            }).catch(()=>{
                console.log("error al crear "+e);
            });
            

        })
    }).catch(e=>{
        console.log("error en la ruta: "+e.message);
        res.send(JSON.parse( `{"error":"${e.message}","description":"ok"}`));


    })

});
accountRouter.post('/signIn', (req,res)=>{
    //res.send("hola");

    let user = JSON.parse(req.body);
    //res.send(user);
    userAccount.signInUser(user).then(userGet=>{
        if(userGet==null ){
            res.send(getResponseLogin(res.statusCode,"denied"));
            
        }else if(bcrypt.compare(user.password,userGet.password) ){
            if(userGet.status==true){
                res.send(getResponseLoginData(res.statusCode,"succesfull",userGet.userName));
            }else{

                res.send(getResponseLoginData(res.statusCode,"non-active","none"));
            }
        } else{
            //console.log(`${user}`);
            res.send(getResponseLoginData(res.statusCode,"denied","none"));
        }  
    }).catch(error=>{
        res.status=400;
        console.log(error);
    });
});
accountRouter.post('/activeAccount',(req,res)=>{

    let userReq=JSON.parse(req.body);

    userAccount.signInUser(userReq).then(userDB=>{
        if(userReq.code===userDB.privCode){
            userAccount.updateUser(userDB).then((result)=>{
                if(result){
                    res.send(getResponseLoginData(res.statusCode,"succesfull",userDB.userName));

                }else{
                    res.send(getResponseLogin(res.statusCode,"denied update user problem","none"));

                }
               

            })
            
        }else{
            res.send(getResponseLogin(res.statusCode,"denied","none"));
        }
    }).catch(error=>{

        res.statusCode=400;
        console.log(error);
        res.send(getResponseLogin(res.statusCode,"denied"));
        
    })
    //console.log(req.body);
    //res.send(req.body);


});
accountRouter.post('/getProgress',(req,res)=>{
    
    var dataObjct=JSON.parse( req.body);
    console.log(dataObjct);
    
    
    userAccount.getProgress(dataObjct.email).then(dataDB=>{
        //console.log(dataDB+"datooo");
        res.send(dataDB);
    }).catch(e=>{
        res.statusCode=400;
        console.log(e);
        res.send("ERROR");
    })

})




accountRouter.get('/',(req,res)=>{


    res.send('hola signup');
});

accountRouter.post('/updateProgress',(req,res)=>{

    var dataObjct = JSON.parse(req.body);
    //console.log(dataObjct);
    userAccount.updateProgress(dataObjct).then(resolve=>{
        res.send(resolve)
    }).catch(e=>{
        res.statusCode=400;
        console.log(e);
        res.send("ERROR");
    })
    
})

 function createNewUser(newAccount){
    return new Promise ((resolve)=>{
        mailer.sendemail(newAccount,newAccount.privCode).then(()=>{
            userAccount.createAccount(newAccount).then(()=>{
                resolve (JSON.parse(`{"error":${res.statusCode},"description":"ok"}`))

            });
        })
    })
   
    

}



module.exports=accountRouter;