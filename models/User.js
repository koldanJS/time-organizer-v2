const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, default: 'firstName'},
    lastName: {type: String, default: 'lastName'},
    company: {type: String, default: ''},
    phone: {type: Number, default: 0},
    dateOfBirth: {type: Date, default: 0},
    activeEntry: {type: Types.ObjectId, ref: 'ActiveEntry'},  //ref - к какой коллекции привязываемся
    archives: {type: Types.ObjectId, ref: 'Archive'},
    projectsId: {type: Types.ObjectId, ref: 'Project'},
    tasksId: {type: Types.ObjectId, ref: 'Task'},
    timesSheets: {type: Types.ObjectId, ref: 'TimesSheet'},
})

module.exports = model('User', schema)