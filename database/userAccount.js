const axios = require('axios').default;
const useObj=require('../models/UsersData.js');

/*const a= new useObj("asd@","asd","pass","status","code");
console.log(a.status);*/
async function createAccount( userObject){
    //console.log(`url con variables de entorno: ${process.env.DB_URL}/Users/${useObj.email}.json`);
    var id=  (userObject.email).substring(0,userObject.email.length-4);
    var url=  `${process.env.DB_URL}/Users/${id}.json`;
    //console.log(`${url} el email es: ${(userObject.email).substring(0,userObject.email.length-4)}, id= ${id}`);
    await axios({
        method:'put',
        url: url,
        data:{

            email:userObject.email,
            userName:userObject.userName,
            password:userObject.password,
            status:userObject.status,
            privCode:userObject.privCode
        }
    }).then(()=>{

        return true;

    }).catch((error)=>{

        console.log(`problema en creacion de ususario: ${error}`);
        return false;

    });
}
  function signInUser(userObject){ //devuelve el usuario como objeto
    console.log(userObject);
    const id = (userObject.email).substring(0,userObject.email.length-4);
    console.log(`${process.env.DB_URL}/Users/${id}.json`);
    return new Promise((resolve,reject)=>{
        axios({
            method:'get',
            url:`${process.env.DB_URL}/Users/${id}.json`
        }).then((response)=>{
            //console.log(response.data);
            resolve (response.data);
        }).catch(error=>{

            reject (error);
        })

    })

}

function updateUser (userObject){
    const id = (userObject.email).substring(0,userObject.email.length-4);
    userObject.status=true;
    console.log(userObject);
    console.log(userObject);
    return new Promise ((resolve, reject)=>{

        axios ({
            method:'put',
            url:`${process.env.DB_URL}/Users/${id}.json`,
            data:{
                
                email:userObject.email,
                userName:userObject.userName,
                password:userObject.password,
                status:userObject.status,
                privCode:userObject.privCode
            }
        }).then(()=>{
            resolve (true);
        }).catch((e)=>{
            reject(false);
        })
    })


}

function createEmptyProgress(userObject){
    const id = (userObject.email).substring(0,userObject.email.length-4);
    console.log(`id de guardado: ${id}`);

    return new Promise ((resolve,reject)=>{
        axios ({
            method:'put',
            url:`${process.env.DB_URL}/progressSaves/${id}.json`,
            data:{
                lvl:1,
                score:0,
                win1:0,
                win2:0,
                win3:0,
                win4:0,
                win5:0,
                win6:0,
                win7:0,
                win8:0,
                defeat:0,
                botScore:0
            }
        }).then(()=>{
            resolve ("se creo datos de guardado correctamente");
        }).catch((e)=>{
            reject (e);

        })
    })


}
function getProgress(email){
    const id = (email).substring(0,email.length-4);
    console.log(`id de guardado: ${id}`);
    return new Promise ((resolve,reject)=>{

        axios({
            method:'get',
            url: `${process.env.DB_URL}/progressSaves/${id}.json`
        }).then((res)=>{
            console.log(res.data);
            resolve(res.data);


        }).catch(err=>{
            reject(err);
        })
    })



}
function updateProgress (useObject){
    console.log(useObject.email);
    const id = (useObject.email).substring(0,useObject.email.length-4);
    console.log(`id de guardado: ${id}`);
    console.log('datos de progreso'+ useObject.progress);
    return new Promise ((resolve, reject)=>{
        axios ({
            method:'put',
            url: `${process.env.DB_URL}/progressSaves/${id}.json`,
            data: useObject.progress,

        }).then((res)=>{
            console.log('actualizado');
            resolve ('actualizado');
        }).catch (err=>{
            reject(err);
        })
    })

}

module.exports={

    createAccount:createAccount,
    signInUser:signInUser,
    updateUser:updateUser,
    createEmptyProgress:createEmptyProgress,
    getProgress:getProgress,
    updateProgress:updateProgress
}