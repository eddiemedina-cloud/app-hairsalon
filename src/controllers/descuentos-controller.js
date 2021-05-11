const descuentosCtrl = {}

const Descuento = require('../models/Descuentos');



descuentosCtrl.getProductos = async (req, res) => {
    const productos = await Descuento.find().sort({categoria: 'desc'})
    res.json(productos)
} 

descuentosCtrl.getOneProducto = async ( req, res) => {
    const producto = await Descuento.findOne({_id: req.params.id})
    res.json(producto)
}

descuentosCtrl.createProducto = async (req, res) => {
    const { nombre, descripcion, categoria, precio, preciodescuento, descuento, picture } = req.body
    const newDescuento = new Descuento({
        nombre, descripcion, categoria, precio, preciodescuento, descuento, picture
    })
    await newDescuento.save()
    res.json({
        newDescuento 
    })
}

descuentosCtrl.updateProducto = async (req, res) => {
    const { nombre, descripcion, categoria, precio, preciodescuento, descuento, picture } = req.body
    if(!picture){
        await Descuento.findOneAndUpdate({_id: req.params.id}, {
            nombre, descripcion, categoria, precio, preciodescuento, descuento
        })
    }else{
        await Descuento.findOneAndUpdate({_id: req.params.id}, {
            nombre, descripcion, categoria, precio, preciodescuento, descuento, picture
        })
    }
    res.json({
        message: 200
    })
}

descuentosCtrl.deleteProducto = async ( req, res ) => {
    await Descuento.findOneAndDelete({ _id: req. params.id})
    res.json('Producto eliminado')
}

module.exports = descuentosCtrl