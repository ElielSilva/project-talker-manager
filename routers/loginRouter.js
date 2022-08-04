const express = require('express');
const { generateTokens } = require('../services/tokenGeretor');
const { authEmail, authPassword } = require('../middlewares/authEmailAndPassword');

const loginRouter = express.Router();

const HTTP_OK_STATUS = 200;

loginRouter.use(express.json());

loginRouter.post('/', authEmail, authPassword, (req, res) => {
  const token = generateTokens();
  res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = loginRouter;