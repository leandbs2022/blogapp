const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Categoria")
const Categorias = mongoose.model("categoria")

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/postagens', (req, res) => {
    res.render("admin/postagens")
})
router.get('/postagens/add', (req, res) => {
    res.render("admin/addpostagem")
})
router.get('/categorias', (req, res) => {

    res.render('admin/categorias')
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', (req, res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categorias(novaCategoria).save().then(() => {
        console.log('categoria salva com sucesso')
    }).catch((err) => {
        console.log('erro ao salva:' + err)
    })})
module.exports = router