function getResponseLogin(code, description){

    return JSON.parse(`{"code":"${code}","description":"${description}"}`)
}

function getResponseLoginData(code, description,userName){

    return JSON.parse(`{"code":"${code}","description":"${description}","userData":"${userName}"}`)
}

module.exports={

    getResponseLogin:getResponseLogin,
    getResponseLoginData:getResponseLoginData
};