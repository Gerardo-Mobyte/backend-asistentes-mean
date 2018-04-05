const Sesiones = require('../models/sesion');
const Alumnos = require('../models/alumno');

module.exports.getSesiones = (req, res) => {
    Sesiones
        .find()
        .populate('alumnos')
        .exec((err, sesiones) => {
            if (err) {
                return res
                    .status(500)
                    .json({
                        mensaje:
                            'Se ha producido un error al obtener las sesiones del curso',
                        error: err
                    });
            }

            res.status(200).json({ success: true, items: sesiones });
        });
}

module.exports.saveSesion = (req, res) => {
    const sesion = new Sesiones(req.body);

    sesion.save((err, resultado) => {
        if (err) {
            return res
                .status(500)
                .json({
                    mensaje: 'Se ha producido un error al guardar la nueva sesión',
                    error: err
                });
        }

        Sesiones.find()
			.populate('alumnos')
			.exec((err, sesiones) => {
				if (err) {
					return res
						.status(500)
						.json({
							mensaje:
								'Se ha producido un error al obtener las sesiones del curso',
							error: err
						});
				}

				res.status(200).json({ success: true, items: sesiones });
			});
    });
}

module.exports.updateSesion = (req, res) => {
    Sesiones.findByIdAndUpdate(req.params.id, req.body, (err, sesion) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Se ha producido un error al obtener la sesión para actualizar',
                error: err
            });
        }

        if (!sesion) {
            return res.status(500).json({
                mensaje: 'La sesión que se quiere actualizar no existe'
            });
        }

        Sesiones.find()
            .populate('alumnos')
            .exec((err, sesiones) => {
                if (err) {
                    return res
                        .status(500)
                        .json({
                            mensaje:
                                'Se ha producido un error al obtener las sesiones del curso',
                            error: err
                        });
                }

                res.status(200).json({ success: true, items: sesiones });
            });
    });
}

module.exports.deleteSesion = (req, res) => {
    Sesiones.findByIdAndRemove(req.params.id, (err, sesion) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Se ha producido un error intentando borrar la sesión',
                error: err
            });
        }

        if (!sesion) {
            return res.status(500).json({
                mensaje: 'La sesión que desea borrar no existe'
            });
        }

        Sesiones.find()
			.populate('alumnos')
			.exec((err, sesiones) => {
				if (err) {
					return res
						.status(500)
						.json({
							mensaje:
								'Se ha producido un error al obtener las sesiones del curso',
							error: err
						});
				}

				res.status(200).json({ success: true, items: sesiones });
			});
    });
}

module.exports.updateAlumnos = (req, res) => {
    Sesiones.findById(req.params.id, (err, sesion) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Se ha producido un error al intentar actualizar los alumnos de la sesión',
                error: err
            });
        }

        if (!sesion) {
            return res.status(500).json({
                mensaje: 'No existe la sesión que quieres actualizar'
            });
        }

        sesion.alumnos = req.body.alumnos;
        sesion.save((errorSave, resultado) => {
            if (errorSave) {
                return res.status(500).json({
                    mensaje: 'No se ha podido actualizar la sesión',
                    error: errorSave
                });
            }

            Sesiones.find()
                .populate('alumnos')
                .exec((err, sesiones) => {
                    if (err) {
                        return res
                            .status(500)
                            .json({
                                mensaje:
                                    'Se ha producido un error al obtener las sesiones del curso',
                                error: err
                            });
                    }

                    res.status(200).json({ success: true, items: sesiones });
                });
        });
    });
}