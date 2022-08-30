//carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
//config
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
//middleware
app.use((req, res, next) => {
    res.local.success_msg = req.flash('success_msg')
    res.local.error_msg = req.flash('error_msg')

    next()
})
//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//handlebars
app.engine('handlebars', handlebars.engine({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutDir: __dirname + '/views/layouts',
    partialsDir: path.join(__dirname, 'views/partials'),
}))
app.set('view engine', 'handlebars')
//mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/blogapp').then(() => {
    console.log('Servidor conectado')
}).catch((err) => {
    console.log('erro ao conectar:' + err)
})
//public
app.use(express.static(path.join(__dirname, 'public')))

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
