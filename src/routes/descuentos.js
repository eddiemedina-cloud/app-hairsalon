'use strict'

const router = require('express').Router()

const { getProductos,
        getOneProducto,
        deleteProducto,
        createProducto,
        updateProducto } = require('../controllers/descuentos-controller')

router.route('/')
    .get(getProductos)
    .post(createProducto)

router.route('/:id')
    .get(getOneProducto)
    .delete(deleteProducto)
    .put(updateProducto)

module.exports = router