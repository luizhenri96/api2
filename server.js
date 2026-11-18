const express = require ('express')
const app = express()
const {MongoClient, ObjectId} = require('mongodb')
const dotenv = require('dotenv')

dotenv.config()

const url = process.env.DATABASE_URL

const client = new MongoClient(url)
let collection

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.get('/index' , (req, res) => {
    res.render('index2.ejs')
})

app.post('/show', async (req, res) => {
    await collection.insertOne({
        nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        nascimento: req.body.nascimento
    })
    res.redirect('/show')
})

app.get('/show' , async (req, res) => {
    const crud = await collection.find().toArray()
    res.render('show2.ejs' , {crud})
})

app.get('/edit/:id', async (req, res) =>{
    const crud = await collection.find({_id:new ObjectId(req.params.id)}).toArray()
    res.render('edit2.ejs', {crud})
})

app.post('/edit/:id', async(req, res) =>{
    await collection.updateOne(
        {_id: new ObjectId(req.params.id)},
        {
            $set:{
                nome: req.body.nome,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                nascimento: req.body.nascimento
            }
        }
    )
    res.redirect('/show')
})

app.get('/delete/:id', async (req, res) => {
    await collection.deleteOne({_id: new ObjectId(req.params.id)})
    res.redirect('/show')
})

async function iniciar(){
    await client.connect()
    const db = client.db('confiaMais')
    collection = db.collection('crud')
    console.log("conectou com o nosso banco")

    app.listen(3001, function(){
        console.log("o nosso servidor está rodando na porta 3001")
    })
}

iniciar().catch(function(erro){
    console.error("Erro ao iniciar", erro)
})
