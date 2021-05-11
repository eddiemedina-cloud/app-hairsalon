const { Schema, model } = require('mongoose')

const Session = new Schema({
    salon: { type: String},
    session: { type: Object}

})

module.exports = model('Session', Session)