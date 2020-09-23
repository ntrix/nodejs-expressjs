module.exports.postAdd = (req, res, next) => {
  if (!req.body.username)
  next();
}