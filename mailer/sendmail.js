

const nodeMailer= require('nodemailer');
const transporter = nodeMailer.createTransport({
    //service:"gmail",
    host:"smtp.gmail.com",//este host se utiliza para realizar envios de email de terceros
    port: 465,
    secure: true,
    auth: {

        user:/*"poogamification7@outlook.com"*/"poogamification7@gmail.com", 
        pass:"ntjbyjwlxhjebref"/*"proyectforgloryasd7"*/
    }

});
async function sendemail( email, code){
    console.log(email);
    try{
    //var num = await Math.floor(Math.random()*(1000-9998+1)+9998);
    const info = await transporter.sendMail({
        from: "poogamification7@gmail.com",
        to: email,
        subject:"PARA ACTIVAR TU CUENTA INICIA SESION E INGRESA EL CODIGO",
        html:`
        <body>
        <a hidden href="https://es.cooltext.com"><img src="https://images.cooltext.com/5672986.png" width="728" height="103" alt="POO WARS" /></a>
        <br/><a href="https://es.cooltext.com" hidden>Cool Text: Logo and Button Generator</a>
        <br/>
        <center>
        <P>
        <b>
            INGESA EL CODIGO PARA ACTIVAR CUENTA
        </b>
        </P>
        <p1>
        CODIGO:${code}
        </p1>
        </center>
        </body>
        `,

    });
    }catch(e){
        console.log(`error email ${e}`);
        throw new Error (`{"error":"${res.statusCode}","description":"${e}}"`);
    }

    

   

    //return info.messageId;

     
}

exports.sendemail=sendemail;