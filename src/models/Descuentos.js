const { Schema, model } = require('mongoose')

const Descuento = new Schema({
    nombre: { type: String },
    precio: { type: Number },
    descuento: { type: Number },
    preciodescuento: { type: Number },
    descripcion: { type: String },
    picture: { type: String },
    categoria: { type: String }
})

module.exports = model('Descuento', Descuento)