const jwt = require('jsonwebtoken');

const UNAUTHORIZED = 401;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED).send({ message: 'внутренняя ошибка сервера' });
  } else {
    const token = authorization.replace('Bearer ', '');
  }

  let payload;

  try {
    payload = jwt.verify(token, 'name-secret-key');
  } catch {
    return res.status(UNAUTHORIZED).send({ message: 'внутренняя ошибка сервера' });
  }

  req.user = payload;
  next();
}