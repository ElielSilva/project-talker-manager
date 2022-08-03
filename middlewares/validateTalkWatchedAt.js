module.exports = function validateTalkWatchedAt(req, res, next) {
  const { watchedAt } = req.body.talk;
  // regex https://precisoestudarsempre.blogspot.com/2013/05/regex-para-datas-mascara-para-datas.html
  const regex = /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/; 
  if (!watchedAt) {
    // return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    const err = { status: 400, message: 'O campo "watchedAt" é obrigatório' };
    throw (err);
  }
  if (!regex.test(watchedAt)) {
    // return res.status(400).json({
    //   message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    // });
    const err = { status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
    throw (err);
  }
  next();
};