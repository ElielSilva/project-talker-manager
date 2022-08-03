module.exports = function validateHeadersAuth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    const err = { status: 401, message: 'Token não encontrado' };
    throw (err);
    // return res.status(401).json({
    //   message: 'Token não encontrado',
    // });
  }
  if (authorization.length !== 16) {
    const err = { status: 401, message: 'Token inválido' };
    throw (err);
    // return res.status(401).json({
    //   message: 'Token inválido',
    // });
  }
  next();
};