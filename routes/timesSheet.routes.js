const { Router } = require('express')
const TimesSheet = require('../models/TimesSheet')
const auth = require('../middleware/auth.middleware')
const router = Router()

//Путь по умолчанию api/timesSheet + окончание
router.put('/edit', auth, async (req, res) => {
    try {
        // Получаем новую таблицу
        const { newTimesSheet } = req.body
        // Находим старую и заменяем
        await TimesSheet.updateOne({ _id: newTimesSheet._id }, newTimesSheet)
        // Если все норм, находим ее и отправляем ответ
        const timesSheet = await TimesSheet.findById(newTimesSheet._id)
        res.status(200).json(timesSheet)
    } catch(e) {
        //Если мы тут, что-то непредвиденное случилось
        res.status(500).json({ message: 'При изменении таблицы что-то пошло не так' })
    }
})

router.get('/:date', auth, async (req, res) => {
    try {
        // Ищем timesSheet, благодаря MW в req есть объект user
        const timesSheet = await TimesSheet.findOne({ date: req.params.date, user: req.user.userId })
        // Если такой нет, создаем новую и отправляем
        if (!timesSheet) {
            // Передаем объект новой таблицы
            const newTimesSheet = new TimesSheet({
                date: req.params.date,
                days: [
                    {shortDay: 'Пн', items: []},
                    {shortDay: 'Вт', items: []},
                    {shortDay: 'Ср', items: []},
                    {shortDay: 'Чт', items: []},
                    {shortDay: 'Пт', items: []},
                    {shortDay: 'Сб', items: []},
                    {shortDay: 'Вс', items: []},
                ],
                user: req.user.userId
            })
            //Дожидаемся сохранения в БД
            await newTimesSheet.save()
            return res.json(newTimesSheet)
        }
        res.json(timesSheet)
    } catch(e) {
        //Если мы тут, что-то непредвиденное случилось
        res.status(500).json({ message: 'При получении таблицы что-то пошло не так' })
    }
})

module.exports = router