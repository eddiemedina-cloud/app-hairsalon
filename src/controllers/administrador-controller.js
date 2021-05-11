const Administrador = require('../models/Administradores')
const Notificacion = require('../models/Notificaciones')

const administradorCtrl = { }

administradorCtrl.getAdministradores = async ( req, res ) => {
    const administradores = await Administrador.find()
    res.json(administradores)
}

administradorCtrl.getOneAdministrador = async ( req, res ) => {
    const administrador = await Administrador.findOne({ _id : req.params.id })
    if(!administrador){
        res.json({ message: 404 })
    }else{
        res.json( administrador )
    } 
}

administradorCtrl.getEstilista = async ( req, res ) => {
    const { estilista } = req.body
    const administrador = await Administrador.findOne({ nombre : estilista })
    if(!administrador){
        res.json({ message: 404 })
    }else{
        res.json( administrador )
    } 
}

administradorCtrl.createAdministrador = async ( req, res) => {
    const { id, nombre, correo, nivel, contraseña  } = req.body
    const newAdministrador = new Administrador({
        id, nombre, correo, nivel, contraseña
    })
    await newAdministrador.save()
    res.json({ message: 200 })
}

administradorCtrl.deleteAdministrador = async ( req, res ) => {
    await Administrador.findOneAndDelete({ _id : req.params.id })
    res.json({ message: 200 })
}

administradorCtrl.updateAdministradorAdmin = async ( req, res ) => {
    const { id, nombre, correo, nivel } = req.body
    await Administrador.findOneAndUpdate({ _id: req.params.id }, {
        id, nombre, correo, nivel
    })
    res.json({ message: 200 })
}



administradorCtrl.updateAdministrador = async ( req, res ) => {
    const { nombre, correo } = req.body
    await Administrador.findOneAndUpdate({ _id: req.params.id }, {
        nombre, correo
    })
    res.json({ message: 200 })
}

administradorCtrl.updateContraseña = async ( req, res ) => {
    const { contraseña } = req.body
    await Administrador.findOneAndUpdate({ _id: req.params.id }, {
        contraseña
    })
    res.json({ message: 200 })
}


administradorCtrl.login = async ( req, res) => {
    const administrador = await Administrador.findOne({ correo: req.body.correo, contraseña: req.body.contraseña  })
    if(!administrador){
        res.json({ message: 404 })
    }else{
        const noti = await Notificacion.findOneAndUpdate({ _id : req.body.notificacion }, {
            administrador : administrador._id
        })
        
        res.json(administrador)

    }
    
}


module.exports = administradorCtrl;