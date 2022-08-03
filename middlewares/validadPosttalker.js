function validateAuthorization(req, res, next) {
  const { authorization } = req.headers;
  // console.log(authorization.length,'  ',authorization.length !== 16);
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
}

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
}

function validateTalkWatchedAt(req, res, next) {
  const { watchedAt } = req.body.talk;
  // regex https://precisoestudarsempre.blogspot.com/2013/05/regex-para-datas-mascara-para-datas.html
  const regex = /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/; 
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!regex.test(watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
}

function validateTalkRate(req, res, next) {
  const { rate } = req.body.talk;
  // console.log(rate, typeof (rate) !== "number", rate < 0 || rate > 5 || !rate);
  if (typeof (rate) !== 'number') {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate <= 0 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

module.exports = {
  validateAuthorization, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateTalkWatchedAt, 
  validateTalkRate,
};