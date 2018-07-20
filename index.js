// desafio GoNode - módulo 1
// Autor: Leandra Mendes do Vale
// email: leandramvale@gmail.com

const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

const userMiddleware = (req, res, next) => {
  const { nome } = req.query;
  // console.log('Acessou userMiddleware - nome:' + nome);

  if (nome === '') {
    res.redirect('/');
  } else {
    next();
  }
};


app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res) => {
  // console.log(req.body);

  // calcula a idade e redireciona para rotas
  const { nome, nascimento } = req.body;

  // const DATA_NASCIMENTO = '07/12/1994';
  // const idade = moment().diff(moment(DATA_NASCIMENTO, "DD/MM/YYYY"), 'years');
  const idade = moment().diff(moment(nascimento, 'DD/MM/YYYY'), 'years');

  // console.log(`${nome} nasceu em ${nascimento}, portanto tem ${idade} anos.`);

  if (idade > 18) {
    res.redirect(`major?nome=${nome}`);
  } else {
    res.redirect(`minor?nome=${nome}`);
  }
});

app.get('/major', userMiddleware, (req, res) => {
  const { nome } = req.query;
  res.render('major', { nome });
});

app.get('/minor', userMiddleware, (req, res) => {
  const { nome } = req.query;
  res.render('minor', { nome });
});


app.listen(3000);
