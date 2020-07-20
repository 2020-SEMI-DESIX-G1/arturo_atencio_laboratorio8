const mongoose = require('mongoose');

let estudianteSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    }, 
    edad:{
        type: String,
        required: true,
    },
    carrera: {
        type: String,
        required: true,
    }
});

let Estudiante =  module.exports = mongoose.model('Estudiante', estudianteSchema);