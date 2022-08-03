module.exports = function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age) {
    // return res.status(400).json({
    //   message: 'O campo "age" é obrigatório',
    // });
    const err = { status: 400, message: 'O campo "age" é obrigatório' };
    throw (err);
  }
  if (age < 18) {
    // return res.status(400).json({
    //   message: 'A pessoa palestrante deve ser maior de idade',
    // });
    const err = { status: 400, message: 'A pessoa palestrante deve ser maior de idade' };
    throw (err);
  }
  next();
};