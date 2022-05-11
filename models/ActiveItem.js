const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    itemIndex: {type: Number, required: true},
    startTime: {type: Number, required: true},
    dateString: {type: String, required: true},
    user: {type: Types.ObjectId, ref: 'User'},  //ref - к какой коллекции привязываемся
})

module.exports = model('ActiveItem', schema)