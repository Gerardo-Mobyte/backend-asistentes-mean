const Alumno = require('../models/alumno');

module.exports.getAlumnos = (req, res) => {
    Alumno.find().exec((err, alumnos) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Se ha producido un error al obtener la lista de alumnos',
                error: err
            });
        }

        res.status(200).json({
            success: true,
            items: alumnos
        });
    });
}

module.exports.getAlumno = (req, res) => {
    Alumno.findById(req.params.id, (err, alumno) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Se ha producido un error al obtener el alumno',
                error: err
            });
        }

        if (!alumno) {
            return res.status(500).json({
                mensaje: 'No se ha encontrado un alumno con el id indicado'
            });
        }

        res.status(200).json({
            success: true,
            items: alumno
        });
    });
}

module.exports.saveAlumno = (req, res) => {
    // 1. Crear un nuevo objeto Alumno desde req.body
    // 2. objAlumno.save((err, result) => {  })
    // 3. Devolver objeto con el listado de Alumnos actualizado

    let alumno = new Alumno({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        telefono: req.body.telefono,
        fechaNacimiento: req.body.fechaNacimiento
    });

    alumno.save((err, result) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Se ha producido un error al guardar el alumno',
                error: err
            });
        }

        Alumno.find().exec((err, alumnos) => {
			if (err) {
				return res
					.status(500)
					.json({
						mensaje: 'Se ha producido un error al obtener la lista de alumnos',
						error: err
					});
			}

			res.status(200).json({ success: true, items: alumnos });
		});
    });
}

module.exports.deleteAlumno = (req, res) => {
    Alumno.findByIdAndRemove(req.params.id, (err, alumno) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Se ha producido un error al intentar borrar el alumno',
                error: err
            });
        }

        Alumno.find().exec((err, alumnos) => {
			if (err) {
				return res
					.status(500)
					.json({
						mensaje: 'Se ha producido un error al obtener la lista de alumnos',
						error: err
					});
			}

			res.status(200).json({ success: true, items: alumnos });
		});
    });
}

module.exports.updateAlumno = (req, res) => {
    Alumno.findByIdAndUpdate(req.params.id, req.body, (err, alumno) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Se ha producido un error al actualizar el alumno',
                error: err
            });
        }

        if (!alumno) {
            return res.status(500).json({
                mensaje: 'No existe el alumno'
            });
        }

        Alumno.find().exec((err, alumnos) => {
			if (err) {
				return res
					.status(500)
					.json({
						mensaje: 'Se ha producido un error al obtener la lista de alumnos',
						error: err
					});
			}

			res.status(200).json({ success: true, items: alumnos });
		});
    });
}
