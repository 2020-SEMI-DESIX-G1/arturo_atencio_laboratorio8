const express = require('express');
const path = require('path');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/lab8');
let db = mongoose.connection;

db.once('open', function(){
  console.log('connected to mongo');
});

db.on('error', function(err){
  console.log(err);
});


const app = express();

let Estudiante = require('./models/estudiante');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/estudiantes', function (req, res) {

  Estudiante.find({}, (err, estudiantes) => {
    if(err){
      console.log('Hubo un Error: ' + err);
    } else {
      res.render('index', {
        title: 'Listado de Estudiates:',
        estudiantes: estudiantes,
      });
    }
  });
});

app.get('/estudiantes/insert', function (req, res) {

  res.render('insert', {
    title: 'Insertar un Estudiante Nuevo: ',
  });
});

app.post('/estudiantes', function (req, res) {
  let estudiante = new Estudiante();
  estudiante.nombre = req.body.nombre
  estudiante.edad = req.body.edad
  estudiante.carrera = req.body.carrera
  
  estudiante.save(function (err) {
    if(err){
      console.log('Hubo un Error: ' + err);
      return;
    } else {
      res.redirect('/estudiantes');
    }
  });
});

app.get('/estudiantes/:id', function(req, res) {

  Estudiante.findById(req.params.id, (err, estudiante) => {
    if(err){
      console.log('Hubo un Error: ' + err);
      return;
    } else {      
      res.render('show', {
        estudiante: estudiante
      });
    }
  });
});

app.get('/estudiantes/edit/:id', function(req, res) {

  Estudiante.findById(req.params.id, (err, estudiante) => {
    if(err){
      console.log('Hubo un Error: ' + err);
      return;
    } else {
      res.render('edit', {
        title: 'Editar Estudiante: ',
        estudiante: estudiante
      });
    }
  });
});

app.put('/estudiantes/:id', function(req, res) {
  let estudiante = {};
  estudiante.nombre = req.body.nombre
  estudiante.edad = req.body.edad
  estudiante.carrera = req.body.carrera
  console.log(estudiante);
  let query = {_id:req.params.id}
  
  Estudiante.update(query, estudiante, function (err) {
    if(err){
      console.log('Hubo un Error: ' + err);
      return;
    } else {
      res.redirect('/estudiantes');
    }
  });
});

app.delete('/estudiantes/:id', function(req, res) {
  res.render('insert', {
    title: 'Insertar un Estudiante Nuevo'
  });
});

app.listen(3000, () => console.log('ejecutando el server en el puerto 3000'))