const express = require("express");

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const shortid = require('shortid');

const userRoute = require('./routes/user.route');
const bookRoute = require('./routes/book.route');
const tranRoute = require('./routes/tran.route');
const authRoute = require('./routes/auth.route');

const app = express();

const userId = 'temp'+shortid.generate();
let cookieCount = 0;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static("public"));

app.use(cookieParser() /*, (req, res, next) => {
  if (!req.cookies['user-id']) {
    res.cookie('user-id', userId);
    console.log('No cookie found, set cookie, cookie count: ', cookieCount = 0);
  } else
    console.log(req.cookies, ': ', ++cookieCount)
  next();
}*/
       )
app.get("/", (req, res) => {
  res.render("index");
});

app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/trans', tranRoute);
app.use('/auth', authRoute);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
