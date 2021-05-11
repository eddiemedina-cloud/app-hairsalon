const { Schema, model } = require('mongoose')

const Administrador = new Schema({
    id: { type: Number },
    nombre : { type: String },
    correo : { type: String },
    contraseña: { type: String },
    nivel: { type: String },
    key: { type: Boolean},
    notificacion : { type: String}
})

module.exports = model('Administrador' , Administrador)