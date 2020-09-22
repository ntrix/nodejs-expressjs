
const shortid = require('shortid')
const db = require('../shared/db');
const users = db.get('users').value();

module.exports = {
  
  index: (req, res) => {
    res.render("users/index", { users: users })
  },
    
  
}