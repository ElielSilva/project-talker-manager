const express = require('express');
const bodyParser = require('body-parser');
require('express-async-errors');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// não remova esse endpoint, e para o avaliador funcionar

const { talkerRouter, loginRouter } = require('./routers/index');

app.use('/talker', talkerRouter);
 
app.use('/login', loginRouter);

// app.use(errosMiddlewares);

app.listen(PORT, () => {
  console.log('Online');
});

///
