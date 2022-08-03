module.exports = function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    // return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    const err = { status: 400, message: 'O campo "talk" é obrigatório' };
    throw (err);
  }
  next();
};