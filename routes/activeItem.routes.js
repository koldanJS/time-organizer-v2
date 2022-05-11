const { Router } = require('express')
const ActiveItem = require('../models/ActiveItem')
const auth = require('../middleware/auth.middleware')
const router = Router()

//Путь по умолчанию api/activeItem + окончание
router.post('/create', auth, async (req, res) => {
    try {
        // Получаем индекс активной записи
        const { itemIndex, dateString } = req.body
        // Создаем и сохраняем запись, userId доступен благодаря MW auth
        const activeItem = new ActiveItem({
            itemIndex, dateString, startTime: Date.now(), user: req.user.userId
        })
        await activeItem.save()
        //После сохранения со статусом 'created' отправляем ответ
        res.status(201).json(activeItem)
    } catch(e) {
        //Если мы тут, что-то непредвиденное случилось
        res.status(500).json({ message: 'При создании записи что-то пошло не так' })
    }
})

router.delete('/delete', auth, async (req, res) => {
    try {
        // Получаем id удаляемой активной записи
        const { id } = req.body
        // Удаляем запись
        await ActiveItem.findByIdAndDelete(id)
        res.json({ message: 'Запись удалена!' })
    } catch(e) {
        //Если мы тут, что-то непредвиденное случилось
        res.status(500).json({ message: 'При удалении записи что-то пошло не так' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        //Благодаря MW в req есть объект user
        const activeItem = await ActiveItem.findOne({ user: req.user.userId })
        res.json(activeItem)
    } catch(e) {
        //Если мы тут, что-то непредвиденное случилось
        res.status(500).json({ message: 'При загрузке записи что-то пошло не так' })
    }
})

module.exports = router