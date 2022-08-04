const express = require('express');

const talkerRouter = express.Router();
talkerRouter.use(express.json());
const rescue = require('express-rescue');
const fs = require('fs').promises;
const { 
  validateAuthorization, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateTalkWatchedAt,
  validateTalkRate,
} = require('../middlewares/validateHeadersAndBody');

const HTTP_OK_STATUS = 200;
const FILE_TALKERS = './talker.json';

talkerRouter.get('/search',
  validateAuthorization,
  async (req, res) => {
  const { q } = req.query;
  const talker = await fs.readFile(FILE_TALKERS, 'utf-8')
    .catch((err) => {
      console.log(err);
      return false;
    });
  const response = JSON.parse(talker);
  const talkerSelected = response
    .filter((item) => item.name.toLowerCase().includes(q.toLowerCase()));
  res.status(200).json(talkerSelected);
});

talkerRouter.get('/', async (req, res) => {
  const talker = await fs.readFile(FILE_TALKERS, 'utf-8')
    .catch((err) => {
      console.log(err);
      return false;
    });
  const response = JSON.parse(talker);
  res.status(200).json(response);
});

talkerRouter.get('/:id', async (req, res) => {
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

talkerRouter.post('/',
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
  talkerConverted.push({ ...person, id: talkerConverted.length + 1 });
  try {
    await fs.writeFile(FILE_TALKERS, JSON.stringify(talkerConverted));
    res.status(201).json(talkerConverted[talkerConverted.length - 1]);
  } catch (error) {
    console.log(error);
  }
}));

talkerRouter.put('/:id',
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

talkerRouter.delete('/:id', validateAuthorization, async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  console.log(authorization);
  const talker = await fs.readFile(FILE_TALKERS, 'utf8')
      .catch((err) => {
        console.log(err);
        return [];
      });
  const talkerConverted = JSON.parse(talker);
  const newList = talkerConverted.filter((item) => item.id !== Number(id));
  try {
    await fs.writeFile(FILE_TALKERS, JSON.stringify(newList));
  } catch (error) {
    console.log(error);
  }
  res.status(204).json();
}); 

module.exports = talkerRouter;