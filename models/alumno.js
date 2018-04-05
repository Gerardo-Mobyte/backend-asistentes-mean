const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String },
    fechaNacimiento: { type: Date }
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Alumno', schema);
