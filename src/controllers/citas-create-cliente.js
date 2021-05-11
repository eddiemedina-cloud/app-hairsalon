const citasCtrl = {}

const Citas = require('../models/Citas')
const Cliente = require('../models/Clientes')
const webpush = require('../webpush')
const Notificaciones = require('../models/Notificaciones')

citasCtrl.createPorHoraCliente = async (req, res) => {
    
    const duracion = req.body.duracion 
    const fila = duracion * 2
    const date = req.body.fecha

    if(duracion === 30){
        const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:00`, estilista: req.body.estilista})
        if(!cita){
            const perfil = await Cliente.findOne({ _id: req.body.id })
            const newCita = new Citas({ 
                fecha: date,
                hora: `${req.body.hora}:30`, 
                estilista: req.body.estilista, 
                cliente: perfil.nombre,
                idcliente : perfil._id,
                telefono: perfil.telefono,
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
                const perfil = await Cliente.findOne({ _id: req.body.id })
                const newCita = new Citas({ 
                    fecha: date,
                    hora: `${req.body.hora}:30`, 
                    estilista: req.body.estilista, 
                    cliente: perfil.nombre,
                    idcliente : perfil._id,
                    telefono: perfil.telefono,
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
                            const perfil = await Cliente.findOne({ _id: req.body.id })
                        const newCita = new Citas({ 
                            fecha: date,
                            hora: `${req.body.hora}:30`, 
                            estilista: req.body.estilista, 
                            cliente: perfil.nombre,
                            idcliente : perfil._id,
                            telefono: perfil.telefono,
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
                                const perfil = await Cliente.findOne({ _id: req.body.id })
                        const newCita = new Citas({ 
                            fecha: date,
                            hora: `${req.body.hora}:30`, 
                            estilista: req.body.estilista, 
                            cliente: perfil.nombre,
                            idcliente : perfil._id,
                            telefono: perfil.telefono,
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
                                            const perfil = await Cliente.findOne({ _id: req.body.id })
                                            const newCita = new Citas({ 
                                                fecha: date,
                                                hora: `${req.body.hora}:30`, 
                                                estilista: req.body.estilista, 
                                                cliente: perfil.nombre,
                                                idcliente : perfil._id,
                                                telefono: perfil.telefono,
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
                                                    const perfil = await Cliente.findOne({ _id: req.body.id })
                                                    const newCita = new Citas({ 
                                                        fecha: date,
                                                        hora: `${req.body.hora}:30`, 
                                                        estilista: req.body.estilista, 
                                                        cliente: perfil.nombre,
                                                        idcliente : perfil._id,
                                                        telefono: perfil.telefono,
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

citasCtrl.createPorMediaHoraCliente = async (req, res) => {

    const duracion = req.body.duracion    
    const date = req.body.fecha
    const fila = duracion * 2

    if(duracion === 30){
        const cita = await Citas.findOne({fecha: date, hora: `${req.body.hora}:30`, estilista: req.body.estilista})
        if(!cita){

            const perfil = await Cliente.findOne({ _id: req.body.id })
            const newCita = new Citas({ 
                fecha: date,
                hora: `${req.body.hora}:30`, 
                estilista: req.body.estilista, 
                cliente: perfil.nombre,
                idcliente : perfil._id,
                telefono: perfil.telefono,
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
                        const perfil = await Cliente.findOne({ _id: req.body.id })
                        const newCita = new Citas({ 
                            fecha: date,
                            hora: `${req.body.hora}:30`, 
                            estilista: req.body.estilista, 
                            cliente: perfil.nombre,
                            idcliente : perfil._id,
                            telefono: perfil.telefono,
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
                            const perfil = await Cliente.findOne({ _id: req.body.id })
                        const newCita = new Citas({ 
                            fecha: date,
                            hora: `${req.body.hora}:30`, 
                            estilista: req.body.estilista, 
                            cliente: perfil.nombre,
                            idcliente : perfil._id,
                            telefono: perfil.telefono,
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
                                const perfil = await Cliente.findOne({ _id: req.body.id })
                        const newCita = new Citas({ 
                            fecha: date,
                            hora: `${req.body.hora}:30`, 
                            estilista: req.body.estilista, 
                            cliente: perfil.nombre,
                            idcliente : perfil._id,
                            telefono: perfil.telefono,
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
                                            const perfil = await Cliente.findOne({ _id: req.body.id })
                                            const newCita = new Citas({ 
                                                fecha: date,
                                                hora: `${req.body.hora}:30`, 
                                                estilista: req.body.estilista, 
                                                cliente: perfil.nombre,
                                                idcliente : perfil._id,
                                                telefono: perfil.telefono,
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
                                                    const perfil = await Cliente.findOne({ _id: req.body.id })
                                                    const newCita = new Citas({ 
                                                        fecha: date,
                                                        hora: `${req.body.hora}:30`, 
                                                        estilista: req.body.estilista, 
                                                        cliente: perfil.nombre,
                                                        idcliente : perfil._id,
                                                        telefono: perfil.telefono,
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