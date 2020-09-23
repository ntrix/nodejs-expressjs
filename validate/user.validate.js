module.exports = {
  errors: [],
  postAdd: (req, res, next) => {
    if (!req.body.username) 
      this.errors.push('Username must have at leat one character');
    if (req.body.username.length > 30)
      this.errors.push('Username can have maiximal 30 characters'); 
    next();
    and maximal 30 charaters');
    res.redirect(req.baseUrl);
  }
}