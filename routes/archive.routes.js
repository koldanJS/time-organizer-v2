const { Router } = require('express')
const Archive = require('../models/Archive')
const TimesSheet = require('../models/TimesSheet')
const auth = require('../middleware/auth.middleware')
const router = Router()

//Путь по умолчанию api/archive + окончание
router.get('/', auth, async (req, res) => {
    try {
        // Ищем archive, благодаря MW в req есть объект user
        const archive = await Archive.find({ user: req.user.userId })
        // Отправляем найденное или []
        res.json(archive)
    } catch(e) {
        //Если мы тут, что-то непредвиденное случилось
        res.status(500).json({ message: 'При получении архива что-то пошло не так' })
    }
})

router.post('/create/:date', auth, async (req, res) => {
    try {
        // Ищем соответствующую дате timesSheet, благодаря MW в req есть объект user
        const timesSheet = await TimesSheet.findOne({ date: req.params.date, user: req.user.userId })
        // Если такой нет, отправляем
        if (!timesSheet) {
            return res.status(404).json({ message: `Таблица за ${req.params.date} не найдена` })
        }
        // Создаем новый архив и сохраняем
        const archive = new Archive({
            date: req.params.date,
            week: timesSheet.week,
            user: req.user.userId
        })
        //Дожидаемся сохранения в БД
        await archive.save()
        // Удаляем таблицу
        await TimesSheet.findOneAndDelete({ date: req.params.date, user: req.user.userId })
        // Отправляем архив ответом
        res.json(archive)
    } catch(e) {
        //Если мы тут, что-то непредвиденное случилось
        res.status(500).json({ message: 'При получении таблицы что-то пошло не так' })
    }
})

// router.put('/edit', auth, async (req, res) => {
//     try {
//         // Получаем новую запись
//         const { timesSheetId, dayNumber, newTaskItem, index, isDelete } = req.body
//         // Находим таблицу, которую нужно изменить
//         const timesSheet = await TimesSheet.findById(timesSheetId)
//         if (!timesSheet) {  // Если нет, отправляем
//             return res.status(404).json({ message: 'Такая таблица не найдена!' })
//         }
//         // Получили массив дней для редактирования
//         let editDays = [...timesSheet.days]
//         // Получили массив записей редактируемого дня
//         let editDayItems = editDays[dayNumber].items
//         // Добавили новую, отредактированную или удалили запись
//         if (isDelete) {
//             editDayItems = editDayItems.filter((item, i) => i !== index)
//         } else if (index < 0) {
//             editDayItems.push(newTaskItem)
//         } else {
//             editDayItems.forEach((item, i) => {
//                 if (i === index) editDayItems[i] = newTaskItem
//             })
//         }
//         editDays[dayNumber].items = editDayItems
//         // Изменяем timesSheet в БД
//         await TimesSheet.updateOne({ _id: timesSheetId }, { days: editDays })
//         // Находим измененную таблицу
//         const editTimesSheet = await TimesSheet.findById(timesSheetId)
//         res.status(200).json(editTimesSheet)
//     } catch(e) {
//         //Если мы тут, что-то непредвиденное случилось
//         res.status(500).json({ message: 'При изменении таблицы что-то пошло не так' })
//     }
// })

// router.get('/:date', auth, async (req, res) => {
//     try {
//         // Ищем timesSheet, благодаря MW в req есть объект user
//         const timesSheet = await TimesSheet.findOne({ date: req.params.date, user: req.user.userId })
//         // Если такой нет, создаем новую и отправляем
//         if (!timesSheet) {
//             // Передаем объект новой таблицы
//             const newTimesSheet = new TimesSheet({
//                 date: req.params.date,
//                 days: [
//                     {shortDay: 'Пн', items: []},
//                     {shortDay: 'Вт', items: []},
//                     {shortDay: 'Ср', items: []},
//                     {shortDay: 'Чт', items: []},
//                     {shortDay: 'Пт', items: []},
//                     {shortDay: 'Сб', items: []},
//                     {shortDay: 'Вс', items: []},
//                 ],
//                 user: req.user.userId
//             })
//             //Дожидаемся сохранения в БД
//             await newTimesSheet.save()
//             return res.json(newTimesSheet)
//         }
//         res.json(timesSheet)
//     } catch(e) {
//         //Если мы тут, что-то непредвиденное случилось
//         res.status(500).json({ message: 'При получении таблицы что-то пошло не так' })
//     }
// })

module.exports = router