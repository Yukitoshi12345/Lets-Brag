// Import required modules
// TODO: Add more modules
const express = require('express');
const multer = require('multer');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const path = require('node:path');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
// Import express-session
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create an Express application instance
const app = express();
// Set the port for the server
const PORT = process.env.PORT || 3001; // Use PORT from environment variable or default to 3001
const hbs = exphbs.create({ helpers });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/bragImages');
  },
  filename: (req, file, cb) => {
    let referenceName = Date.now() + path.extname(file.originalname);
    let fileObject = file;
    cb(null, Date.now() + path.extname(file.originalname)); // change the name of the file from its original name to its posted date and extended name
    console.log(file);
    console.log(referenceName);
    console.log(fileObject);
  }
});

// The upload function and route using with Multer module
const upload = multer({storage: storage});

app.get('/upload', (req, res) => {
  res.render('layouts/upload.handlebars');
});

app.post('/upload', upload.single('image'), (req, res) => {
  res.render('dashboard.handlebars');
});

// Set up sessions
const sess = {
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
  cookie: {
    // secure: true,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60, //expire in an hour of idle
  },
};
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse incoming request bodies in JSON format
app.use(express.json());
// Middleware to parse URL-encoded data with extended options
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
