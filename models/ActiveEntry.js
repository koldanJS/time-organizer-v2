const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    entryNumber: {type: Number, required: true},    //??
    startTime: {type: Number, required: true},  //??
    timesSheet: {type: Types.ObjectId, ref: 'TimesSheet'},  //ref - к какой коллекции привязываемся
    user: {type: Types.ObjectId, ref: 'User'},
})

module.exports = model('ActiveEntry', schema)