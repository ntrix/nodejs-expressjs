const express = require("express");
const bodyParser = require('body-parser')

const userRoute = require('./routes/user.route');
const bookRoute = require('./routes/book.route');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use('/users',userRoute);
app.use('/books', bookRoute);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
