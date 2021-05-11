const { Schema, model } = require('mongoose')

const Notificaciones = new Schema({
    subscripcion : { type: Object},
    administrador : { type : String }
})

module.exports = model('Notificaciones', Notificaciones)