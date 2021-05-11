const { Schema, model } = require('mongoose')

const Canjeables = new Schema({
    nombre: { type: String },
    puntos: { type: Number },
    descripcion: { type: String },
    picture: { type: String },
    categoria: { type: String }
})

module.exports = model('Canjeable', Canjeables)