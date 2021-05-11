const { Router } =require('express')
const router = Router()

const { 
        getCitas,
        getAllCitas,
        getOneCita,
        getHistorialPorcliente,
        updateCita,
        deleteCita,
    } = require('../controllers/citas-controller')
  
const {disponibilidadDeCita, createPorHora, createPorMediaHora} = require('../controllers/citas-create')

const { createPorHoraCliente, createPorMediaHoraCliente } = require('../controllers/citas-create-cliente')

router.route('/disponibilidad').post(disponibilidadDeCita)
router.route('/history/:id').get(getHistorialPorcliente)

router.route('/all-citas').get(getAllCitas)
    
router.route('/:id')
  .get(getOneCita)
  .put(updateCita)
  .delete(deleteCita)

router.route('/').post(getCitas)

router.route('/hora').post(createPorHora)

router.route('/media').post(createPorMediaHora)

router.route('/cliente/hora').post(createPorHoraCliente)

router.route('/cliente/media').post(createPorMediaHoraCliente)
  
module.exports = router

 
    