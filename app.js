//carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
//const mongoose = require('mongoose')
//config
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')
//mongoose

//public
app.use(express.static(path.join(__dirname,'public')))
//rotas
app.get('/', (req, res) => {
    res.send('Principal')
})
app.use('/admin', admin)
//Outros
const port = 8080
app.listen(port, () => {
    console.log('servidor rodando!')
})
