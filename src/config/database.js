'use strict'

const mongoose = require('mongoose')
const { mongodb } = require('./data')

mongoose.connect(mongodb.URI, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false,
    useUnifiedTopology: true
})
    .then( db => console.log('Base conectada'))
    .catch( err => console.log(`Error al conectar base de datos: ${err}`))