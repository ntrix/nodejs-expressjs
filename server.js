const express = require("express");

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const shortid = require('shortid');

const userRoute = require('./routes/user.route');
const bookRoute = require('./routes/book.route');
const tranRoute = require('./routes/tran.route');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static("public"));

const userId = shortid.generate();

app.get("/", (req, res) => {
  res.cookie('user',)
  res.render("index");
});

app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/trans', tranRoute);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
