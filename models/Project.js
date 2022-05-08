const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, default: ''},
    user: {type: Types.ObjectId, ref: 'User'},  //ref - к какой коллекции привязываемся
})

module.exports = model('Project', schema)