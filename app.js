const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
// import passport and passport-jwt modules
const passport = require('passport');
const passportJWT = require('passport-jwt');
const cookieParser = require('cookie-parser');
const User = require('./model/user');
const Review = require('./model/review');
const Product = require('./model/product');
// const uuid = require('uuid/v4');
const multer = require('multer');

const sequelize = require('./db');
const ProductRoute = require('./routes/product')
const ReviewRoute = require('./routes/review')
const UserRoute = require('./routes/user')
const app = express();
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};
// jwtOptions.jwtFromRequest = cookieExtractor;

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';
// lets create our strategy for web token
// let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
// }
//==============================
// passport.use(strategy);

app.use(passport.initialize());

// app.set('view engine', 'ejs');
// app.set('views', 'views');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyparser.json({ limit: '50mb' }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('imageUrl'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
    res.status(404).json('404 api not found');
  });
app.use(ProductRoute)
app.use(ReviewRoute)
app.use(UserRoute)
sequelize
  .sync({ force: true })
  //.sync()
  .then(result => {

    const server = app.listen(process.env.PORT || 3300);

    console.log(`Connection has been established successfully port 3300`);
    const io = require('./socket').init(server);
    io.on('connected', socket => {
      console.log('User Connected');
      socket.on('disconnected', () => console.log('User Disconnected'));
    });

  })
  .catch(err => console.log(err));