const { Router } = require('express')
const router = Router()

const { 
            getOneServicio,
            getServicios,
            createServicio,
            updateServicio,
            deleteServicio
        } = require('../controllers/servicio-controller')

router.route('/')
        .get(getServicios)
        .post(createServicio)

router.route('/:id')
        .get(getOneServicio)
        .put(updateServicio)
        .delete(deleteServicio)

module.exports = router