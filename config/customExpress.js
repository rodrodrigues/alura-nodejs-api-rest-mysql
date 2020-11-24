const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

module.exports = () => {
    //Inicia o servidor
    const app = express()

    //Usando o body parser no server
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //Inclui os arquivos de controllers em APP. 
    consign()
        .include('controllers')
        .into(app)

    return app
}
