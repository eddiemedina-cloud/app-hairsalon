
const { Router } = require('express')
const router = Router()
const webpush = require('../webpush')
const Notificaciones = require('../models/Notificaciones')




    
router.post('/subscription', async (req, res) => {
    
    const subscripcion = req.body.register

    const newSubscripcion = new Notificaciones({
        subscripcion
    })

    const save = await newSubscripcion.save()

    res.json(save._id)

    const playload = JSON.stringify({
        title: 'Bienvenido',        
    })
    
    try {
        await webpush.sendNotification(subscripcion, playload)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
