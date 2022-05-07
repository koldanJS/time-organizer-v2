const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code })

        if (!link) {
            return res.status(404).json({ message: 'Ссылка не найдена' })
        }

        // Если ссылка есть
        link.clicks++
        await link.save()
        res.redirect(link.from)

    } catch(e) {
        //Если мы тут, что-то непредвиденное случилось
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router