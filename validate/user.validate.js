module.exports = {
  errors: [],
  postAdd: (req, res, next) => {
    if (req.body.username && req.body.username.length <= 30)
      next();
    this.errors.push('Username must have at leat one and maximal 30 charaters');
    res.redirect(req.baseUrl);
  }
}