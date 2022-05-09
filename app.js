const express = require('express')
const path = require('path')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
//Т. к. body воспринимается, как стрим, этом MW позволяет его парсить в json
app.use(express.json({ extended: true }))
//Подключаем обработчики роутов
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/project', require('./routes/project.routes'))
app.use('/api/task', require('./routes/task.routes'))
app.use('/t', require('./routes/redirect.routes'))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build/index.html'))
    })
}

const PORT = process.env.PORT || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch(e) {
        console.log('Server error', e.message)
        process.exit(1) //Выйти из глобального процесса node.js, если что-то пошло не так
    }
}

start()