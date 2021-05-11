const CanjeablesCtrl = {}

const Canjeable = require('../models/Canjeables');



CanjeablesCtrl.getProductos = async (req, res) => {
    const productos = await Canjeable.find().sort({categoria: 'desc'})
    res.json(productos)
} 

CanjeablesCtrl.getOneProducto = async ( req, res) => {
    const producto = await Canjeable.findOne({_id: req.params.id})
    res.json(producto)
}

CanjeablesCtrl.createProducto = async (req, res) => {
    const { nombre, descripcion, categoria, puntos, picture } = req.body
    const newCanjeable = new Canjeable({
        nombre, descripcion, categoria, puntos, picture
    })
    await newCanjeable.save()
    res.json({
        newCanjeable 
    })
}

CanjeablesCtrl.updateProducto = async (req, res) => {
    const { nombre, descripcion, categoria, puntos, picture } = req.body
    if(!picture){
        await Canjeable.findOneAndUpdate({_id: req.params.id}, {
            nombre, descripcion, categoria, puntos
        })
    }else{
        await Canjeable.findOneAndUpdate({_id: req.params.id}, {
            nombre, descripcion, categoria, puntos, picture
        })
    }
    res.json({
        message: 200
    })
}



CanjeablesCtrl.deleteProducto = async ( req, res ) => {
    await Canjeable.findOneAndDelete({ _id: req. params.id})
    res.json('Producto eliminado')
}

module.exports = CanjeablesCtrl