const citasCtrl = {}

const Citas = require('../models/Citas')
const webpush = require('../webpush')
const Notificaciones = require('../models/Notificaciones')

citasCtrl.disponibilidadDeCita = async ( req, res ) => {
    const horas =[]
    const date = req.body.fecha
    const a = await Citas.findOne({fecha: date, hora: "8:00", estilista: req.body.estilista})
    if(!a){
        horas.push({hora : "8:00", horaNumber: 8, media: false})
    }
    const b = await Citas.findOne({fecha: date, hora: "8:30", estilista: req.body.estilista})
    if(!b){
        horas.push({hora : "8:30", horaNumber: 8, media: true})
    }
    const c = await Citas.findOne({fecha: date, hora: "9:00", estilista: req.body.estilista})
    if(!c){
        horas.push({hora : "9:00", horaNumber: 9, media: false})
    }
    
    const d = await Citas.findOne({fecha: date, hora: "9:30", estilista: req.body.estilista})
    if(!d){
        horas.push({hora : "9:30", horaNumber: 9, media: true})
    }
    const e = await Citas.findOne({fecha: date, hora: "10:00", estilista: req.body.estilista})
    if(!e){
        horas.push({hora : "10:00", horaNumber: 10, media: false})
    }
    
    const f = await Citas.findOne({fecha: date, hora: "10:30", estilista: req.body.estilista})
    if(!f){
        horas.push({hora : "10:30", horaNumber: 10, media: true})
    }
    const g = await Citas.findOne({fecha: date, hora: "11:00", estilista: req.body.estilista})
    if(!g){
        horas.push({hora : "11:00", horaNumber: 11, media: false})
    }
    const h = await Citas.findOne({fecha: date, hora: "11:30", estilista: req.body.estilista})
    if(!h){
        horas.push({hora : "11:30", horaNumber: 11, media: true})
    }
    const i = await Citas.findOne({fecha: date, hora: "12:00", estilista: req.body.estilista})
    if(!i){
        horas.push({hora : "12:00", horaNumber: 12, media: false})
    }
    const j = await Citas.findOne({fecha: date, hora: "12:30", estilista: req.body.estilista})
    if(!j){
        horas.push({hora : "12:30", horaNumber: 12, media: true})
    }
    const k = await Citas.findOne({fecha: date, hora: "13:00", estilista: req.body.estilista})
    if(!k){
        horas.push({hora : "13:00", horaNumber: 13, media: false})
    }
    const l = await Citas.findOne({fecha: date, hora: "13:30", estilista: req.body.estilista})
    if(!l){
        horas.push({hora : "13:30", horaNumber: 13, media: true})
    }
    const m = await Citas.findOne({fecha: date, hora: "14:00", estilista: req.body.estilista})
    if(!m){
        horas.push({hora : "14:00", horaNumber: 14, media: false})
    }
    const n = await Citas.findOne({fecha: date, hora: "14:30", estilista: req.body.estilista})
    if(!n){
        horas.push({hora : "14:30", horaNumber: 14, media: true})
    }
    const o = await Citas.findOne({fecha: date, hora: "15:00", estilista: req.body.estilista})
    if(!o){
        horas.push({hora : "15:00", horaNumber: 15, media: false})
    }
    const p = await Citas.findOne({fecha: date, hora: "15:30", estilista: req.body.estilista})
    if(!p){
        horas.push({hora : "15:30", horaNumber: 15, media: true})
    }
    const q = await Citas.findOne({fecha: date, hora: "16:00", estilista: req.body.estilista})
    if(!q){
        horas.push({hora : "16:00", horaNumber: 16, media: false})
    }
    const r = await Citas.findOne({fecha: date, hora: "16:30", estilista: req.body.estilista})
    if(!r){
        horas.push({hora : "16:30", horaNumber: 16, media: true})
    }
    const s = await Citas.findOne({fecha: date, hora: "17:00", estilista: req.body.estilista})
    if(!s){
        horas.push({hora : "17:00", horaNumber: 17, media: false})
    }
    const t = await Citas.findOne({fecha: date, hora: "17:30", estilista: req.body.estilista})
    if(!t){
        horas.push({hora : "17:30", horaNumber: 17, media: true})
    }
    
    res.json(horas)
}

citasCtrl.createPorHora = async (req, res) => {
    
    const duracion = req.body.duracion 
    const fila = duracion * 2
    const date = req.body.fecha

    if(duracion === 30){
        const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:00`, estilista: req.body.estilista})
        if(!cita){
            const newCita = new Citas({ 
                fecha: date,
                hora: `${req.body.hora}:00`, 
                estilista: req.body.estilista, 
                cliente: req.body.cliente,
                telefono: req.body.telefono,
                servicio: req.body.servicio,
                rowspan: 1,
                confirmacion: false
            })
            await newCita.save()
            const subs = await Notificaciones.findOne({ administrador : req.body.estilista })
            const playload = JSON.stringify({
                title: `Tienes una nueva cita el dia ${date}`,        
            })
            try {
                await webpush.sendNotification(subs.subscripcion, playload)
            } catch (error) {
                console.log(error)
            }
            res.json({ message: 200})
        }else{
            res.json({message: 401})
        }
    }

    if(duracion === 1){
        const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:00`, estilista: req.body.estilista})
        if(!cita){
            const citaB = await Citas.findOne({fecha: date, hora: `${req.body.hora}:30`, estilista: req.body.estilista})
            if(!citaB){
                        const newCita = new Citas({ 
                            fecha: date,
                            hora: `${req.body.hora}:00`, 
                            estilista: req.body.estilista, 
                            cliente: req.body.cliente,
                            telefono: req.body.telefono,
                            servicio: req.body.servicio,
                            rowspan: fila,
                            confirmacion: false
                        })
                        const id = await newCita.save()
                        const ocupadoB = new Citas({ 
                            fecha: date, hora: `${req.body.hora}:30`, 
                            ocupado: true,
                            estilista: req.body.estilista,
                            idcita: id._id
                        })
                        await ocupadoB.save()
                        const subs = await Notificaciones.findOne({ administrador : req.body.estilista })
                        const playload = JSON.stringify({
                            title: `Tienes una nueva cita el dia ${date}`,        
                        })
                        try {
                            await webpush.sendNotification(subs.subscripcion, playload)
                        } catch (error) {
                            console.log(error)
                        }
                        res.json({ message: 200})
                }else{
                res.json({ message: 401})
            }
        }else{
            res.json({ message: 401})
        }
}
    if(duracion === 2){
            const two = req.body.hora + 1
            const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:00`, estilista: req.body.estilista})
            if(!cita){
                const citaB = await Citas.findOne({fecha: date, hora: `${req.body.hora}:30`, estilista: req.body.estilista})
                if(!citaB){
                    const citaC = await Citas.findOne({fecha: date, hora: `${two}:00`, estilista: req.body.estilista})
                    if(!citaC){
                        const citaD = await Citas.findOne({fecha: date, hora: `${two}:30`, estilista: req.body.estilista})
                        if(!citaD){ 
                            const newCita = new Citas({ 
                                fecha: date,
                                hora: `${req.body.hora}:00`, 
                                estilista: req.body.estilista, 
                                cliente: req.body.cliente,
                                telefono: req.body.telefono,
                                servicio: req.body.servicio,
                                rowspan: fila,
                                confirmacion: false
                            })
                            const id = await newCita.save()
                            const ocupar = new Citas({ idcita: id._id, fecha: date, hora: `${req.body.hora}:30`, ocupado: true, estilista: req.body.estilista })
                            await ocupar.save()
                            const ocupadoA = new Citas({ idcita: id._id, fecha: date, hora: `${hora = req.body.hora + 1}:00`, ocupado: true,estilista: req.body.estilista })
                            await ocupadoA.save()
                            const ocupadoB = new Citas({ idcita: id._id, fecha: date, hora: `${hora = req.body.hora + 1}:30`, ocupado: true,estilista: req.body.estilista })
                            await ocupadoB.save()
                            const subs = await Notificaciones.findOne({ administrador : req.body.estilista })
            const playload = JSON.stringify({
                title: `Tienes una nueva cita el dia ${date}`,        
            })
            try {
                await webpush.sendNotification(subs.subscripcion, playload)
            } catch (error) {
                console.log(error)
            }
                            res.json({ message: 200})
                        }else{
                            res.json({ message: 401})
                        }    
                    }else{
                        res.json({ message: 401})
                    }
                }else{
                    res.json({ message: 401})
                }
            }else{
                res.json({ message: 401})
            }
    }
    if(duracion === 3){
        
        const two = req.body.hora + 1
        const three = two + 1 
        const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:00`, estilista: req.body.estilista})
        if(!cita){
            const citaB = await Citas.findOne({fecha: date, hora: `${req.body.hora}:30`, estilista: req.body.estilista})
            if(!citaB){
                const citaC = await Citas.findOne({fecha: date, hora: `${two}:00`, estilista: req.body.estilista})
                if(!citaC){
                    const citaD = await Citas.findOne({fecha: date, hora: `${two}:30`, estilista: req.body.estilista})
                    if(!citaD){ 
                        const citaE = await Citas.findOne({fecha: date, hora: `${three}:00`, estilista: req.body.estilista})
                        if(!citaE){
                            const citaF = await Citas.findOne({fecha: date, hora: `${three}:30`, estilista: req.body.estilista})
                            if(!citaF){
                                const newCita = new Citas({ 
                                    fecha: date,
                                    hora: `${req.body.hora}:00`, 
                                    estilista: req.body.estilista, 
                                    cliente: req.body.cliente,
                                    telefono: req.body.telefono,
                                    servicio: req.body.servicio,
                                    rowspan: fila,
                                    confirmacion: false
                                })
                                const id = await newCita.save()
                                const ocupar = new Citas({ idcita: id._id, fecha: date, hora: `${req.body.hora}:30`, ocupado: true, estilista: req.body.estilista })
                                await ocupar.save()
                                const ocupadoA = new Citas({ idcita: id._id, fecha: date, hora: `${hora = req.body.hora + 1}:00`, ocupado: true,estilista: req.body.estilista })
                                await ocupadoA.save()
                                const ocupadoB = new Citas({ idcita: id._id, fecha: date, hora: `${hora = req.body.hora + 1}:30`, ocupado: true,estilista: req.body.estilista })
                                await ocupadoB.save()
                                const ocupadoD = new Citas({ idcita: id._id, fecha: date, hora: `${hora = req.body.hora + 2}:00`, ocupado: true,estilista: req.body.estilista })
                                await ocupadoD.save()
                                const ocupadoE = new Citas({ idcita: id._id, fecha: date, hora: `${hora = req.body.hora + 2}:30`, ocupado: true,estilista: req.body.estilista })
                                await ocupadoE.save()
                                const subs = await Notificaciones.findOne({ administrador : req.body.estilista })
            const playload = JSON.stringify({
                title: `Tienes una nueva cita el dia ${date}`,        
            })
            try {
                await webpush.sendNotification(subs.subscripcion, playload)
            } catch (error) {
                console.log(error)
            }
                                res.json({ message: 200})
                            }else{
                                res.json({ message: 401})
                            }
                        }else{
                            res.json({ message: 401})
                        }
                    } else{
                        res.json({ message: 401})
                    } 
                }else{
                    res.json({ message: 401})
                }
            }else{
                res.json({ message: 401})
            }
        }else{
            res.json({ message: 401})
        }
    }
    if(duracion === 4){
        const two = req.body.hora + 1
        const three = two + 1
        const four = three + 1 
        const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:00`, estilista: req.body.estilista})
        if(!cita){
            const citaB = await Citas.findOne({fecha: date, hora: `${req.body.hora}:30`, estilista: req.body.estilista})
            if(!citaB){
                const citaC = await Citas.findOne({fecha: date, hora: `${two}:00`, estilista: req.body.estilista})
                if(!citaC){
                    const citaD = await Citas.findOne({fecha: date, hora: `${two}:30`, estilista: req.body.estilista})
                    if(!citaD){ 
                        const citaE = await Citas.findOne({fecha: date, hora: `${three}:00`, estilista: req.body.estilista})
                        if(!citaE){
                            const citaF = await Citas.findOne({fecha: date, hora: `${three}:30`, estilista: req.body.estilista})
                            if(!citaF){
                                const citaG= await Citas.findOne({fecha: date, hora: `${four}:00`, estilista: req.body.estilista})
                                    if(!citaG){
                                        const citaH = await Citas.findOne({fecha: date, hora: `${four}:30`, estilista: req.body.estilista})
                                        if(!citaH){
                                            const newCita = new Citas({ 
                                                fecha: date,
                                                hora: `${req.body.hora}:00`, 
                                                estilista: req.body.estilista, 
                                                cliente: req.body.cliente,
                                                telefono: req.body.telefono,
                                                servicio: req.body.servicio,
                                                rowspan: fila,
                                                confirmacion: false
                                        })
                                        const id = await newCita.save()
                                        const ocupar = new Citas({ idcita: id._id, fecha: date, hora: `${req.body.hora}:30`, ocupado: true, estilista: req.body.estilista })
                                        await ocupar.save()
                                        const ocupadoA = new Citas({ idcita: id._id, fecha: date, hora: `${two}:00`, ocupado: true,estilista: req.body.estilista })
                                        await ocupadoA.save()
                                        const ocupadoB = new Citas({ idcita: id._id, fecha: date, hora: `${two}:30`, ocupado: true,estilista: req.body.estilista })
                                        await ocupadoB.save()
                                        const ocupadoD = new Citas({ idcita: id._id, fecha: date, hora: `${three}:00`, ocupado: true,estilista: req.body.estilista })
                                        await ocupadoD.save()
                                        const ocupadoE = new Citas({ idcita: id._id, fecha: date, hora: `${three}:30`, ocupado: true,estilista: req.body.estilista })
                                        await ocupadoE.save()
                                        const ocupadoF = new Citas({ idcita: id._id, fecha: date, hora: `${four}:00`, ocupado: true,estilista: req.body.estilista })
                                        await ocupadoF.save()
                                        const ocupadoG = new Citas({ idcita: id._id, fecha: date, hora: `${four}:30`, ocupado: true,estilista: req.body.estilista })
                                        await ocupadoG.save()
                                        const subs = await Notificaciones.findOne({ administrador : req.body.estilista })
            const playload = JSON.stringify({
                title: `Tienes una nueva cita el dia ${date}`,        
            })
            try {
                await webpush.sendNotification(subs.subscripcion, playload)
            } catch (error) {
                console.log(error)
            }
                                        res.json({ message: 200})
                                    }else{
                                        res.json({ message: 401})
                                    }
                                }else{
                                    res.json({ message: 401})
                                }
                            }else{
                                res.json({ message: 401})
                            }
                        }else{
                            res.json({ message: 401})
                        }
                    }else{
                        res.json({ message: 401})
                    }  
                }else{
                    res.json({ message: 401})
                }
            }else{
                res.json({ message: 401})
            }
        }else{
            res.json({ message: 401})
        }
    }
    if(duracion === 5){
        const two = req.body.hora + 1
        const three = two + 1
        const four = three + 1 
        const five = four + 1
        const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:00`, estilista: req.body.estilista})
        if(!cita){
            const citaB = await Citas.findOne({fecha: date, hora: `${req.body.hora}:30`, estilista: req.body.estilista})
            if(!citaB){
                const citaC = await Citas.findOne({fecha: date, hora: `${two}:00`, estilista: req.body.estilista})
                if(!citaC){
                    const citaD = await Citas.findOne({fecha: date, hora: `${two}:30`, estilista: req.body.estilista})
                    if(!citaD){ 
                        const citaE = await Citas.findOne({fecha: date, hora: `${three}:00`, estilista: req.body.estilista})
                        if(!citaE){
                            const citaF = await Citas.findOne({fecha: date, hora: `${three}:30`, estilista: req.body.estilista})
                            if(!citaF){
                                const citaG= await Citas.findOne({fecha: date, hora: `${four}:00`, estilista: req.body.estilista})
                                    if(!citaG){
                                        const citaH = await Citas.findOne({fecha: date, hora: `${four}:30`, estilista: req.body.estilista})
                                        if(!citaH){
                                            const citaI= await Citas.findOne({fecha: date, hora: `${five}:00`, estilista: req.body.estilista})
                                            if(!citaI){
                                                const citaJ = await Citas.findOne({fecha: date, hora: `${five}:30`, estilista: req.body.estilista})
                                                if(!citaJ){
                                            const newCita = new Citas({ 
                                                fecha: date,
                                                hora: `${req.body.hora}:00`, 
                                                estilista: req.body.estilista, 
                                                cliente: req.body.cliente,
                                                telefono: req.body.telefono,
                                                servicio: req.body.servicio,
                                                rowspan: fila,
                                                confirmacion: false
                                            })
                                            const id = await newCita.save()
                                            const ocupar = new Citas({ idcita: id._id, fecha: date, hora: `${req.body.hora}:30`, ocupado: true, estilista: req.body.estilista })
                                            await ocupar.save()
                                            const ocupadoA = new Citas({idcita: id._id, fecha: date, hora: `${two}:00`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoA.save()
                                            const ocupadoB = new Citas({ idcita: id._id, fecha: date, hora: `${two}:30`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoB.save()
                                            const ocupadoD = new Citas({ idcita: id._id, fecha: date, hora: `${three}:00`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoD.save()
                                            const ocupadoE = new Citas({ idcita: id._id, fecha: date, hora: `${three}:30`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoE.save()
                                            const ocupadoF = new Citas({ idcita: id._id, fecha: date, hora: `${four}:00`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoF.save()
                                            const ocupadoG = new Citas({ idcita: id._id, fecha: date, hora: `${four}:30`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoG.save()
                                            const ocupadoH = new Citas({ idcita: id._id, fecha: date, hora: `${five}:00`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoH.save()
                                            const ocupadoI = new Citas({ idcita: id._id, fecha: date, hora: `${five}:30`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoI.save()
                                            const subs = await Notificaciones.findOne({ administrador : req.body.estilista })
            const playload = JSON.stringify({
                title: `Tienes una nueva cita el dia ${date}`,        
            })
            try {
                await webpush.sendNotification(subs.subscripcion, playload)
            } catch (error) {
                console.log(error)
            }
                                            res.json({ message: 200})
                                        }else{
                                            res.json({ message: 401})
                                        }
                                    }else{
                                        res.json({ message: 401})
                                    }
                                }else{
                                    res.json({ message: 401})
                                }
                            }else{
                                res.json({ message: 401})
                            }
                        } else{
                            res.json({ message: 401})
                        }  
                    }else{
                        res.json({ message: 401})
                    }
                    }else{
                        res.json({ message: 401})
                    }  
                }else{
                    res.json({ message: 401})
                }
            }else{
                res.json({ message: 401})
            }
        }else{
            res.json({ message: 401})
        }
    }
}

citasCtrl.createPorMediaHora = async (req, res) => {

    const duracion = req.body.duracion    
    const date = req.body.fecha
    const fila = duracion * 2

    if(duracion === 30){
        const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:30`, estilista: req.body.estilista})
        if(!cita){
            const newCita = new Citas({ 
                fecha: date,
                hora: `${req.body.hora}:30`, 
                estilista: req.body.estilista, 
                cliente: req.body.cliente,
                telefono: req.body.telefono,
                servicio: req.body.servicio,
                rowspan: 1,
                confirmacion: false
            })
            await newCita.save()
            const subs = await Notificaciones.findOne({ administrador : req.body.estilista })
            const playload = JSON.stringify({
                title: `Tienes una nueva cita el dia ${date}`,        
            })
            try {
                await webpush.sendNotification(subs.subscripcion, playload)
            } catch (error) {
                console.log(error)
            }
            res.json({ message: 200})
        }else{
            res.json({message: 401})
        }
    }

    if(duracion === 1){
        const two = req.body.hora + 1
        const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:30`, estilista: req.body.estilista})
        if(!cita){
            const citaB = await Citas.findOne({fecha: date, hora: `${two}:00`, estilista: req.body.estilista})
            if(!citaB){
                        const newCita = new Citas({ 
                            fecha: date,
                            hora: `${req.body.hora}:30`, 
                            estilista: req.body.estilista, 
                            cliente: req.body.cliente,
                            telefono: req.body.telefono,
                            servicio: req.body.servicio,
                            rowspan: fila,
                            confirmacion: false
                        })
                        const id = await newCita.save()
                        const ocupadoB = new Citas({ 
                            fecha: date, hora: `${two}:00`, 
                            ocupado: true,
                            estilista: req.body.estilista,
                            idcita: id._id
                        })
                        await ocupadoB.save()
                        const subs = await Notificaciones.findOne({ administrador : req.body.estilista })
                        console.log(subs)
            const playload = JSON.stringify({
                title: `Tienes una nueva cita el dia ${date}`,        
            })
            try {
                await webpush.sendNotification(subs.subscripcion, playload)
            } catch (error) {
                console.log(error)
            }
                        res.json({ message: 200})
                }else{
                res.json({ message: 401})
            }
        }else{
            res.json({ message: 401})
        }
}
    if(duracion === 2){
            const two = req.body.hora + 1
            const three = two + 1
            const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:30`, estilista: req.body.estilista})
            if(!cita){
                const citaB = await Citas.findOne({fecha: date, hora: `${two}:00`, estilista: req.body.estilista})
                if(!citaB){
                    const citaC = await Citas.findOne({fecha: date, hora: `${two}:30`, estilista: req.body.estilista})
                    if(!citaC){
                        const citaD = await Citas.findOne({fecha: date, hora: `${three}:00`, estilista: req.body.estilista})
                        if(!citaD){ 
                            const newCita = new Citas({ 
                                fecha: date,
                                hora: `${req.body.hora}:30`, 
                                estilista: req.body.estilista, 
                                cliente: req.body.cliente,
                                telefono: req.body.telefono,
                                servicio: req.body.servicio,
                                rowspan: fila,
                                confirmacion: false
                            })
                           
                            const id = await newCita.save()
                            const ocupar = new Citas({idcita: id._id, fecha: date, hora: `${two}:00`, ocupado: true, estilista: req.body.estilista })
                            await ocupar.save()
                            const ocupadoA = new Citas({idcita: id._id, fecha: date, hora: `${two}:30`, ocupado: true,estilista: req.body.estilista })
                            await ocupadoA.save()
                            const ocupadoB = new Citas({idcita: id._id, fecha: date, hora: `${three}:00`, ocupado: true,estilista: req.body.estilista })
                            await ocupadoB.save()
                            const subs = await Notificaciones.findOne({ administrador : req.body.estilista })
            const playload = JSON.stringify({
                title: `Tienes una nueva cita el dia ${date}`,        
            })
            try {
                await webpush.sendNotification(subs.subscripcion, playload)
            } catch (error) {
                console.log(error)
            }
                            res.json({ message: 200})
                        }else{
                            res.json({ message: 401})
                        }    
                    }else{
                        res.json({ message: 401})
                    }
                }else{
                    res.json({ message: 401})
                }
            }else{
                res.json({ message: 401})
            }
    }
    if(duracion === 3){
        const two = req.body.hora + 1
        const three = two + 1 
        const four = three + 1 
        const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:30`, estilista: req.body.estilista})
        if(!cita){
            const citaB = await Citas.findOne({fecha: date, hora: `${two}:00`, estilista: req.body.estilista})
            if(!citaB){
                const citaC = await Citas.findOne({fecha: date, hora: `${two}:30`, estilista: req.body.estilista})
                if(!citaC){
                    const citaD = await Citas.findOne({fecha: date, hora: `${three}:00`, estilista: req.body.estilista})
                    if(!citaD){ 
                        const citaE = await Citas.findOne({fecha: date, hora: `${three}:30`, estilista: req.body.estilista})
                        if(!citaE){
                            const citaF = await Citas.findOne({fecha: date, hora: `${four}:00`, estilista: req.body.estilista})
                            if(!citaF){
                                const newCita = new Citas({ 
                                    fecha: date,
                                    hora: `${req.body.hora}:30`, 
                                    estilista: req.body.estilista, 
                                    cliente: req.body.cliente,
                                    telefono: req.body.telefono,
                                    servicio: req.body.servicio,
                                    rowspan: fila,
                                    confirmacion: false
                                })
                                const id = await newCita.save()
                                const ocupar = new Citas({ idcita: id._id, fecha: date, hora: `${two}:00`, ocupado: true, estilista: req.body.estilista })
                                await ocupar.save()
                                const ocupadoA = new Citas({ idcita: id._id, fecha: date, hora: `${two}:30`, ocupado: true,estilista: req.body.estilista })
                                await ocupadoA.save()
                                const ocupadoB = new Citas({ idcita: id._id, fecha: date, hora: `${three}:00`, ocupado: true,estilista: req.body.estilista })
                                await ocupadoB.save()
                                const ocupadoD = new Citas({ idcita: id._id, fecha: date, hora: `${three}:30`, ocupado: true,estilista: req.body.estilista })
                                await ocupadoD.save()
                                const ocupadoE = new Citas({idcita: id._id, fecha: date, hora: `${four}:00`, ocupado: true,estilista: req.body.estilista })
                                await ocupadoE.save()
                                const subs = await Notificaciones.findOne({ administrador : req.body.estilista })
            const playload = JSON.stringify({
                title: `Tienes una nueva cita el dia ${date}`,        
            })
            try {
                await webpush.sendNotification(subs.subscripcion, playload)
            } catch (error) {
                console.log(error)
            }
                                res.json({ message: 200})
                            }else{
                                res.json({ message: 401})
                            }
                        }else{
                            res.json({ message: 401})
                        }
                    } else{
                        res.json({ message: 401})
                    } 
                }else{
                    res.json({ message: 401})
                }
            }else{
                res.json({ message: 401})
            }
        }else{
            res.json({ message: 401})
        }
    }
    if(duracion === 4){
        const two = req.body.hora + 1
        const three = two + 1
        const four = three + 1 
        const five = four + 1
        const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:30`, estilista: req.body.estilista})
        if(!cita){
            const citaB = await Citas.findOne({fecha: date, hora: `${two}:00`, estilista: req.body.estilista})
            if(!citaB){
                const citaC = await Citas.findOne({fecha: date, hora: `${two}:30`, estilista: req.body.estilista})
                if(!citaC){
                    const citaD = await Citas.findOne({fecha: date, hora: `${three}:00`, estilista: req.body.estilista})
                    if(!citaD){ 
                        const citaE = await Citas.findOne({fecha: date, hora: `${three}:30`, estilista: req.body.estilista})
                        if(!citaE){
                            const citaF = await Citas.findOne({fecha: date, hora: `${four}:00`, estilista: req.body.estilista})
                            if(!citaF){
                                const citaG= await Citas.findOne({fecha: date, hora: `${four}:30`, estilista: req.body.estilista})
                                    if(!citaG){
                                        const citaH = await Citas.findOne({fecha: date, hora: `${five}:00`, estilista: req.body.estilista})
                                        if(!citaH){
                                            const newCita = new Citas({ 
                                                fecha: date,
                                                hora: `${req.body.hora}:30`, 
                                                estilista: req.body.estilista, 
                                                cliente: req.body.cliente,
                                                telefono: req.body.telefono,
                                                servicio: req.body.servicio,
                                                rowspan: fila,
                                                confirmacion: false
                                        })
                                        const id = await newCita.save()
                                        const ocupar = new Citas({idcita: id._id, fecha: date, hora: `${two}:00`, ocupado: true, estilista: req.body.estilista })
                                        await ocupar.save()
                                        const ocupadoA = new Citas({idcita: id._id, fecha: date, hora: `${two}:30`, ocupado: true,estilista: req.body.estilista })
                                        await ocupadoA.save()
                                        const ocupadoB = new Citas({idcita: id._id, fecha: date, hora: `${three}:00`, ocupado: true,estilista: req.body.estilista })
                                        await ocupadoB.save()
                                        const ocupadoD = new Citas({ idcita: id._id,fecha: date, hora: `${three}:30`, ocupado: true,estilista: req.body.estilista })
                                        await ocupadoD.save()
                                        const ocupadoE = new Citas({ idcita: id._id,fecha: date, hora: `${four}:00`, ocupado: true,estilista: req.body.estilista })
                                        await ocupadoE.save()
                                        const ocupadoF = new Citas({idcita: id._id, fecha: date, hora: `${four}:30`, ocupado: true,estilista: req.body.estilista })
                                        await ocupadoF.save()
                                        const ocupadoG = new Citas({idcita: id._id, fecha: date, hora: `${five}:00`, ocupado: true,estilista: req.body.estilista })
                                        await ocupadoG.save()
                                        const subs = await Notificaciones.findOne({ administrador : req.body.estilista })
            const playload = JSON.stringify({
                title: `Tienes una nueva cita el dia ${date}`,        
            })
            try {
                await webpush.sendNotification(subs.subscripcion, playload)
            } catch (error) {
                console.log(error)
            }
                                        res.json({ message: 200})
                                    }else{
                                        res.json({ message: 401})
                                    }
                                }else{
                                    res.json({ message: 401})
                                }
                            }else{
                                res.json({ message: 401})
                            }
                        }else{
                            res.json({ message: 401})
                        }
                    }else{
                        res.json({ message: 401})
                    }  
                }else{
                    res.json({ message: 401})
                }
            }else{
                res.json({ message: 401})
            }
        }else{
            res.json({ message: 401})
        }
    }
    if(duracion === 5){
        const two = req.body.hora + 1
        const three = two + 1
        const four = three + 1 
        const five = four + 1
        const six = five + 1
        const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:30`, estilista: req.body.estilista})
        if(!cita){
            const citaB = await Citas.findOne({fecha: date, hora: `${two}:00`, estilista: req.body.estilista})
            if(!citaB){
                const citaC = await Citas.findOne({fecha: date, hora: `${two}:30`, estilista: req.body.estilista})
                if(!citaC){
                    const citaD = await Citas.findOne({fecha: date, hora: `${three}:00`, estilista: req.body.estilista})
                    if(!citaD){ 
                        const citaE = await Citas.findOne({fecha: date, hora: `${three}:30`, estilista: req.body.estilista})
                        if(!citaE){
                            const citaF = await Citas.findOne({fecha: date, hora: `${four}:00`, estilista: req.body.estilista})
                            if(!citaF){
                                const citaG= await Citas.findOne({fecha: date, hora: `${four}:30`, estilista: req.body.estilista})
                                    if(!citaG){
                                        const citaH = await Citas.findOne({fecha: date, hora: `${five}:00`, estilista: req.body.estilista})
                                        if(!citaH){
                                            const citaI= await Citas.findOne({fecha: date, hora: `${five}:30`, estilista: req.body.estilista})
                                            if(!citaI){
                                                const citaJ = await Citas.findOne({fecha: date, hora: `${six}:00`, estilista: req.body.estilista})
                                                if(!citaJ){
                                            const newCita = new Citas({ 
                                                fecha: date,
                                                hora: `${req.body.hora}:30`, 
                                                estilista: req.body.estilista, 
                                                cliente: req.body.cliente,
                                                telefono: req.body.telefono,
                                                servicio: req.body.servicio,
                                                rowspan: fila,
                                                confirmacion: false
                                            })
                                            const id = await newCita.save()
                                            const ocupar = new Citas({ idcita: id._id, fecha: date, hora: `${two}:00`, ocupado: true, estilista: req.body.estilista })
                                            await ocupar.save()
                                            const ocupadoA = new Citas({ idcita: id._id, fecha: date, hora: `${two}:30`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoA.save()
                                            const ocupadoB = new Citas({ idcita: id._id, fecha: date, hora: `${three}:00`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoB.save()
                                            const ocupadoD = new Citas({ idcita: id._id, fecha: date, hora: `${three}:30`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoD.save()
                                            const ocupadoE = new Citas({ idcita: id._id, fecha: date, hora: `${four}:00`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoE.save()
                                            const ocupadoF = new Citas({ idcita: id._id, fecha: date, hora: `${four}:30`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoF.save()
                                            const ocupadoG = new Citas({ idcita: id._id, fecha: date, hora: `${five}:00`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoG.save()
                                            const ocupadoH = new Citas({ idcita: id._id, fecha: date, hora: `${five}:30`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoH.save()
                                            const ocupadoI = new Citas({ idcita: id._id, fecha: date, hora: `${six}:00`, ocupado: true,estilista: req.body.estilista })
                                            await ocupadoI.save()
                                            const subs = await Notificaciones.findOne({ administrador : req.body.estilista })
            const playload = JSON.stringify({
                title: `Tienes una nueva cita el dia ${date}`,        
            })
            try {
                await webpush.sendNotification(subs.subscripcion, playload)
            } catch (error) {
                console.log(error)
            }
                                            res.json({ message: 200})
                                        }else{
                                            res.json({ message: 401})
                                        }
                                    }else{
                                        res.json({ message: 401})
                                    }
                                }else{
                                    res.json({ message: 401})
                                }
                            }else{
                                res.json({ message: 401})
                            }
                        }else{
                            res.json({ message: 401})
                        }  
                    }else{
                        res.json({ message: 401})
                    }
                    }else{
                        res.json({ message: 401})
                    }  
                }else{
                    res.json({ message: 401})
                }
            }else{
                res.json({ message: 401})
            }
        }else{
            res.json({ message: 401})
        }
    }
}

module.exports = citasCtrl;