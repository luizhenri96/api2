
const express = require('express')
const app = express()
const {MongoClient, ObjectId} = require('mongodb')
const dotenv = require('dotenv')

dotenv.config()

const url = process.env.DATABASE_URL

const client = new MongoClient(url)
let collection

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

// Página principal
app.get('/', (req, res) => {
    res.redirect('/index')
})

// Página inicial
app.get('/index', (req, res) => {
    res.render('index2.ejs')
})

// Cadastrar
app.post('/show', async (req, res) => {
    await collection.insertOne({
        nome: req.body.nome,
        senha: req.body.senha,
        telefone: req.body.telefone,
        data: req.body.data
    })

    res.redirect('/show')
})

// Mostrar dados
app.get('/show', async (req, res) => {
    const crud = await collection.find().toArray()
    res.render('show2.ejs', {crud})
})

// Visualizar edição
app.get('/edit2/:id', async (req, res) => {
    const crud = await collection.findOne({
        _id: new ObjectId(req.params.id)
    })

    res.render('edit2.ejs', {crud})
})

// Atualizar edição
app.post('/edit2/:id', async (req, res) => {
    await collection.updateOne(
        {_id: new ObjectId(req.params.id)},
        {
            $set: {
                nome: req.body.nome,
                senha: req.body.senha,
                telefone: req.body.telefone,
                data: req.body.data
            }
        }
    )

    res.redirect('/show')
})

// Excluir
app.get('/delete/:id', async (req, res) => {
    await collection.deleteOne({
        _id: new ObjectId(req.params.id)
    })

    res.redirect('/show')
})

// Iniciar banco de dados e servidor
async function iniciar() {
    await client.connect()

    const db = client.db('confiaMais')
    collection = db.collection('crud')

    console.log("Conectou com o nosso banco")

    app.listen(3001, function() {
        console.log("O nosso servidor está rodando na porta 3001")
    })
}

iniciar().catch(function(erro) {
    console.error("Erro ao iniciar", erro)
})
