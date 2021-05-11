const { Router } = require('express')
const router = Router()

const { getAdministradores,
        getOneAdministrador,
        createAdministrador,
        updateAdministrador,
        updateAdministradorAdmin,
        updateContraseña,
        login,
        deleteAdministrador,
        getEstilista
    } = require('../controllers/administrador-controller')

router.route('/')
    .get(getAdministradores)
    .post(createAdministrador)

router.route('/:id')
    .get(getOneAdministrador)
    .put(updateAdministradorAdmin)
    .delete(deleteAdministrador)

router.route('/login').post(login)

router.route('/update-profile/:id').put(updateAdministrador)

router.route('/update-password/:id').put(updateContraseña)

router.route('/estilista').post(getEstilista)

module.exports = router