const express = require('express');
const bodyParser = require('body-parser');
require('express-async-errors');
const rescue = require('express-rescue');
const fs = require('fs').promises;
// const errosMiddlewares = require('./middlewares/errosMiddlewares');
// const talker = require('./talker.json');
const { generateTokens } = require('./services/tokenGeretor');
const { authEmail, authPassword } = require('./middlewares/authEmailAndPassword');
const { 
  validateAuthorization, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateTalkWatchedAt,
  validateTalkRate,
} = require('./middlewares/validadPosttalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const FILE_TALKERS = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search',
  validateAuthorization,
  async (req, res) => {
  const { q } = req.query;
  console.log(q);
  
  const talker = await fs.readFile(FILE_TALKERS, 'utf-8')
    .catch((err) => {
      console.log(err);
      return false;
    });
  const response = JSON.parse(talker);
  const talkerSelected = response
    .filter((item) => item.name.toLowerCase().includes(q.toLowerCase()));
  console.log(talkerSelected);
  res.status(HTTP_OK_STATUS).json(talkerSelected);
});

app.get('/talker', async (req, res) => {
  const talker = await fs.readFile(FILE_TALKERS, 'utf-8')
    .catch((err) => {
      console.log(err);
      return false;
    });
  const response = JSON.parse(talker);
  res.status(HTTP_OK_STATUS).json(response);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile(FILE_TALKERS, 'utf-8')
    .catch((err) => {
      console.log(err);
      return false;
    });
  const talkerConverted = JSON.parse(talker);
  const talkerSelected = talkerConverted.find((person) => person.id === Number(id));
  if (!talkerSelected) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talkerSelected);
});

app.post('/talker',
  validateAuthorization,
  validateName,
  validateAge,
  validateTalk,
  validateTalkWatchedAt,
  validateTalkRate,
  rescue(async (req, res) => {
  const person = req.body;
  const talker = await fs.readFile(FILE_TALKERS, 'utf8')
    .catch((err) => {
      console.log(err);
      return [];
    });
  const talkerConverted = JSON.parse(talker);
  // console.log('primeiro', typeof(person));
  talkerConverted.push({ ...person, id: talkerConverted.length + 1 });
  // console.log('meu log ' ,talkerConverted);
  try {
    await fs.writeFile(FILE_TALKERS, JSON.stringify(talkerConverted));
    res.status(201).json(talkerConverted[talkerConverted.length - 1]);
  } catch (error) {
    console.log(error);
  }
}));

app.put('/talker/:id',
  validateAuthorization,
  validateName,
  validateAge,
  validateTalk,
  validateTalkWatchedAt,
  validateTalkRate,
  rescue(async (req, res) => {
    const { id } = req.params;
    const talkUp = req.body;
    const talker = await fs.readFile(FILE_TALKERS, 'utf8')
      .catch((err) => {
        console.log(err);
        return [];
      });
    const talkerConverted = JSON.parse(talker);
    const talkIndex = talkerConverted.findIndex((talk) => talk.id === Number(id));
    talkerConverted[talkIndex] = { ...talkerConverted[talkIndex], ...talkUp };
    try {
      await fs.writeFile(FILE_TALKERS, JSON.stringify(talkerConverted));
      res.status(200).json(talkerConverted[talkIndex]);
    } catch (error) {
      console.log(error);
    }
}));

app.delete('./talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile(FILE_TALKERS, 'utf8')
      .catch((err) => {
        console.log(err);
        return [];
      });
  const talkerConverted = JSON.parse(talker);
  const newList = talkerConverted.filter((item) => item.id !== Number(id));
  try {
    await fs.writeFile(FILE_TALKERS, JSON.stringify(newList));
    res.status(204);
  } catch (error) {
    console.log(error);
  }
}); 

app.post('/login', authEmail, authPassword, (req, res) => {
  const token = generateTokens();
  res.status(HTTP_OK_STATUS).json({ token });
});

// app.use(errosMiddlewares);

app.listen(PORT, () => {
  console.log('Online');
});

///
