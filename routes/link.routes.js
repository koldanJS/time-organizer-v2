const { Router } = require('express')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')
const router = Router()

//Путь по умолчанию api/link + окончание
router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const { from } = req.body

        //Проверяем, существует ли такая ссылка
        const existing = await Link.findOne({ from, owner: req.user.userId })
        //Если да, просто отправляем ее ответом
        if (existing) {
            // if (existing.owner === req.user.userId) {
                return res.json({ link: existing })
            // }
        }

        //Формируем сокращенную ссылку
        const code = shortid.generate()
        const to = baseUrl + '/t/' + code

        //Создаем эту ссылку в БД, userId доступен благодаря MW auth
        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        await link.save()

        //После сохранения со статусом 'created' отправляем ответ
        res.status(201).json({ link })
    } catch(e) {
        //Если мы тут, что-то непредвиденное случилось
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        //Благодаря MW в req есть объект user
        const links = await Link.find({ owner: req.user.userId })  //???
        res.json(links)
    } catch(e) {
        //Если мы тут, что-то непредвиденное случилось
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)  //???
        res.json(link)
    } catch(e) {
        //Если мы тут, что-то непредвиденное случилось
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router