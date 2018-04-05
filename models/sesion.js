const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const alumno = require('./alumno');

const schema = new Schema({
    dia: { type: String, required: true },
    hora: { type: String, required: true },
    aula: { type: String, required: true },
    alumnos: [{ type: Schema.Types.ObjectId, ref: 'Alumno' }]
});

module.exports = mongoose.model('Sesion', schema);
