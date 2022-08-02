const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./talker.json');
const { generateTokens } = require('./services/tokenGeretor');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// funçoes de middlewares
// function authEmail(params) {
  
// }

// fim

app.get('/talker', (req, res) => {
  res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  console.log('meu log', typeof id);
  const talkerSelected = talker.find((person) => person.id === Number(id));
  if (!talkerSelected) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talkerSelected);
});

app.post('/login', (req, res) => {
  // const { email, password } = req.body;
  const token = generateTokens();
  res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});

///
