const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()

const dbUrl = 'mongodb+srv://admin:7sZzutY65Mg3zkQq@cluster0.ns4sxry.mongodb.net'
const dbName = 'ocean-jornada-backend'

const client = new MongoClient(dbUrl)

async function main() {
  console.log('Conectando ao banco de dados...')
  await client.connect()
  console.log('Banco de dados conectado com sucesso!')

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  // Desafio: criar endpoint /oi que exibe "Olá, mundo!"
  app.get('/oi', function (req, res) {
    res.send('Olá, mundo!')
  })

  // Lista de Personagens
  const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

  const db = client.db(dbName)
  const collection = db.collection('item')

  // Read All - [GET] /item
  app.get('/item', async function (req, res) {
    // Obter todos os documentos da collection
    const documentos = await collection.find().toArray()

    // Pegamos os documentos e enviamos como resposta HTTP
    res.send(documentos)
  })

  // Sinalizamos para o Express que vamos usar JSON no Body
  app.use(express.json())

  // Create - [POST] /item
  app.post('/item', function (req, res) {
    // Obtemos o nome enviado no Request Body
    const item = req.body.nome

    // Inserimos o item no final da lista
    lista.push(item)

    // Enviamos uma mensagem de sucesso!
    res.send('Item criado com sucesso!')
  })

  // Read By Id - [GET] /item/:id
  app.get('/item/:id', function (req, res) {
    // Acessamos o parâmetro de rota ID
    const id = req.params.id

    // Acessamos o item na lista pelo índice corrigido (id - 1)
    const item = lista[id - 1]

    // Enviamos o item obtido como resposta
    res.send(item)
  })

  // Update - [PUT] /item/:id
  app.put('/item/:id', function (req, res) {
    // Acessamos o ID do parâmetro de rota
    const id = req.params.id

    // Acessamos o novoItem no body da requisição
    const novoItem = req.body.nome

    // Atualizamos a lista com a nova informação
    lista[id - 1] = novoItem

    // Enviamos uma mensagem de sucesso
    res.send('Item atualizado com sucesso: ' + id)
  })

  app.listen(3000)
}

main()
