const citasCtrl = {}

const Citas = require('../models/Citas')

citasCtrl.getAllCitas = async (req, res) => {
    const citas = await Citas.find()
    res.json(citas)
}

citasCtrl.getCitas = async ( req, res ) => {
    const date = req.body.fecha

    const a = await Citas.find({fecha: date, hora: "8:00", estilista: req.body.estilista})
    const b = await Citas.find({fecha: date, hora: "8:30", estilista: req.body.estilista})
    const c = await Citas.find({fecha: date, hora: "9:00", estilista: req.body.estilista})
    const d = await Citas.find({fecha: date, hora: "9:30", estilista: req.body.estilista})
    const e = await Citas.find({fecha: date, hora: "10:00", estilista: req.body.estilista})
    const f = await Citas.find({fecha: date, hora: "10:30", estilista: req.body.estilista})
    const g = await Citas.find({fecha: date, hora: "11:00", estilista: req.body.estilista})
    const h = await Citas.find({fecha: date, hora: "11:30", estilista: req.body.estilista})
    const i = await Citas.find({fecha: date, hora: "12:00", estilista: req.body.estilista})
    const j = await Citas.find({fecha: date, hora: "12:30", estilista: req.body.estilista})
    const k = await Citas.find({fecha: date, hora: "13:00", estilista: req.body.estilista})
    const l = await Citas.find({fecha: date, hora: "13:30", estilista: req.body.estilista})
    const m = await Citas.find({fecha: date, hora: "14:00", estilista: req.body.estilista})
    const n = await Citas.find({fecha: date, hora: "14:30", estilista: req.body.estilista})
    const o = await Citas.find({fecha: date, hora: "15:00", estilista: req.body.estilista})
    const p = await Citas.find({fecha: date, hora: "15:30", estilista: req.body.estilista})
    const q = await Citas.find({fecha: date, hora: "16:00", estilista: req.body.estilista})
    const r = await Citas.find({fecha: date, hora: "16:30", estilista: req.body.estilista})
    const s = await Citas.find({fecha: date, hora: "17:00", estilista: req.body.estilista})
    const t = await Citas.find({fecha: date, hora: "17:30", estilista: req.body.estilista})
    
    const citas = { a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t }
    res.json(citas)
}

citasCtrl.getOneCita = async ( req, res) => {
    const cita = await Citas.findOne({_id: req.params.id})
    res.json(cita)
}

citasCtrl.getHistorialPorcliente = async ( req, res ) => {
    const citas = await Citas.find({ idcliente : req.params.id }).sort({ fecha: -1})
    res.json(citas)
} 



citasCtrl.updateCita = async ( req, res ) => {
    const { fecha, hora, estilista, cliente, telefono } = req.body
    await Citas.findOneAndUpdate({ _id: req.params.id }, {
        fecha, hora, estilista, cliente, telefono
    })
    res.json({ message: 200 })
}


citasCtrl.deleteCita = async ( req, res ) => {
    const id = req.params.id
    await Citas.findOneAndDelete({ _id: id })
    const result = await Citas.deleteMany({ idcita: id})
    console.log(result)
    res.json({ message: 200 })
}



module.exports = citasCtrl;