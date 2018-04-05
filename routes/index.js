var express = require('express');
var router = express.Router();
const alumnosController = require('../controllers/AlumnosController');
const sesionesController = require('../controllers/SesionesController');

/* Alumnos */
router.get('/alumnos', alumnosController.getAlumnos);
router.get('/alumnos/:id', alumnosController.getAlumno);
router.post('/alumnos', alumnosController.saveAlumno);
router.delete('/alumnos/:id', alumnosController.deleteAlumno);
router.put('/alumnos/:id', alumnosController.updateAlumno);

/* Sesiones */
router.get('/sesiones', sesionesController.getSesiones);
router.post('/sesiones', sesionesController.saveSesion);
router.put('/sesiones/:id', sesionesController.updateSesion);
router.delete('/sesiones/:id', sesionesController.deleteSesion);

router.put('/sesiones/:id/alumnos', sesionesController.updateAlumnos);

module.exports = router;
