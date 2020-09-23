module.exports = {
  
  postAdd: (req, res, next) => {
    res.locals = { errors: [] };
    
    if (!req.body.username.length) 
      res.locals.errors.push('Username must have at leat one character');
    
    if (req.body.username.length > 30)
      res.locals.errors.push('Username can have maiximal 30 characters'); 

    next();
  }
}