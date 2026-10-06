const express = require('express')
const app = express()
const exibir = require('ejs')
const executar = require('nodemon')
const driveMD = 'mongodb+srv://luizds2026_db_user:V9SU3w5YuIZC5fYo@cluster0.1bgmxbc.mongodb.net/?appName=Cluster0'

app.listen(3000, function(){
    console.log("O nosso servidor está na porta 3000")
})

app.get('/ler', (request, response)=>{
    response.send("Olá mundo!")
})
