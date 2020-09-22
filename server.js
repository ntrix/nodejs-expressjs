const express = require("express");
const bodyParser = require('body-parser')

const userRoutes = require('./routes/user.route');
const bookRoutes = require('./routes/book.route');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use(userRoutes, bookRoutes);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
