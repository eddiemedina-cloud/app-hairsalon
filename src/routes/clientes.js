const { Router } =require('express')
const router = Router()

const { getClientes, newCliente, deleteCliente, getOnePerfil, login, getOneCliente, updateCliente, updateContraseña, sumarCorte, sumarPuntos, updateClienteAdmin } = require('../controllers/clientes-controller')

router.route('/')
    .get(getClientes)
    .post(newCliente)

router.route('/:id')
    .put(updateClienteAdmin)
    .delete(deleteCliente)
    .get(getOneCliente)

router.route('/perfil/:id')
    .put(updateCliente)
    .get(getOnePerfil)

router.route('/login').post(login)

router.route('/perfil/pass/:id').put(updateContraseña)

router.route('/corte/:id').put(sumarCorte)

router.route('/puntos/:id').put(sumarPuntos)


module.exports = router