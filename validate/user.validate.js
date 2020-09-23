module.exports.postAdd = (req, res, next) => {
  if (!req.body.username || req.body.username.length > 30)
    res.redirect(req.baseUrl + '/error');
  next();
}