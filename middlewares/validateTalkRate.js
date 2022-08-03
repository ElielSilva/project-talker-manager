module.exports = function validateTalkRate(req, res, next) {
  const { rate } = req.body.talk;
  // console.log(rate, typeof (rate), '  ', Number.isInteger(rate) !== true || rate < 0 || rate > 6);
  if (!rate) {
    // return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    const err = { status: 400, message: 'O campo "rate" é obrigatório' };
    throw (err);
  }
  if (rate < 0 || rate > 6) {
    // return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    const err = { status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
    throw (err);
  }
  next();
};