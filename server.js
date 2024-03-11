// Import required modules
// ----------------------------------------------------------------
// Core modules for application setup
const express = require('express'); // Web application framework
const exphbs = require('express-handlebars'); // Handlebars templating engine
const Handlebars = require('handlebars');
const path = require('node:path'); // File path handling
const session = require('express-session'); // Session management
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Session store using Sequelize
const cors = require('cors'); // CORS middleware
const {clog} = require('./utils/clog');
// ----------------------------------------------------------------

// Application-specific modules
const routes = require('./controllers'); // Import routes configuration
const sequelize = require('./config/connection'); // Database connection setup
const helpers = require('./utils/helpers'); // Custom helper functions



// Require the upload middleware
const upload = require('./utils/uploads');


// Create an Express application instance
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 3001; // Use PORT from environment variable or default to 3001

// Configure custom Handlebars 
const hbs = exphbs.create({ helpers });

// ----------------------------------------------------------------

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

// Configure Handlebars as the view engine
// ----------------------------------------------------------------
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// ----------------------------------------------------------------

// Middleware to handle incoming data
// app.use(uploadPicture);
// ----------------------------------------------------------------
app.use(clog);

// Middleware to parse incoming request bodies in JSON format
app.use(express.json());

// This line registers middleware with the Express.js application (app)
// that enables Cross-Origin Resource Sharing (CORS).
app.use(cors());

// Middleware to parse URL-encoded data with extended options
// Parse URL-encoded data with extended options
app.use(express.urlencoded({ extended: true }));

// ----------------------------------------------------------------

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '/public')));

// ----------------------------------------------------------------

// turn on routes
app.use(routes);

// turn on connection to db and server
// Establish database connection and start the server
// ----------------------------------------------------------------
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
