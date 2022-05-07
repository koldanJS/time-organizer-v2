const express = require('express')
const path = require('path')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
//Т. к. body воспринимается, как стрим, этом MW позволяет его парсить в json
app.use(express.json({ extended: true }))
//Подключаем обработчики роутов
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

// // Static file 
// app.use(express.static(path.join(__dirname, 'client/build')));
// //production 
// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(
//       __dirname, 'client/build')));
//     app.get('*', (req, res) => {
//       res.sendfile(path.join(
//         __dirname = 'client/build/index.html'));
//     })
//   }
  
// //build 
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'/client/public/index.html'))
// })

// !!!!!!!!!!!!!!!!!!
// app.use(express.static(path.join(__dirname)))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/index.html'))
// })
// !!!!!!!!!!!!!!!!!!!!!

app.use(express.static(path.join(__dirname, '/client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
})


// app.get('/', (req, res) => {
//     res.end('<h1>Home page</h1>')
// })

// app.get('/about', (req, res) => {
//     res.end('<h1>About</h1>')
// })

const PORT = process.env.PORT || 80

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