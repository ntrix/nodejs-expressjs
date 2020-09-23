module.exports = {
  postAdd: (req, res, next) => {
    const errors = [];
    if (req.body.username.length < 2) 
      errors.push('Username must have at leat 2 characters');
    if (req.body.username.length > 30)
      errors.push('Username can have maiximal 30 characters'); 
    return errors;
  }
}