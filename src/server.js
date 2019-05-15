import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import morgan from 'morgan';

import router from './routes';
import passport from './routes/services/passport-strategies.services';
import session from 'express-session';

// Create global app object
const app = express();

app.use(cors());

// Define Static folder for public assets
app.use(express.static(path.join(__dirname, '../doc')));

// enable use of dotenv config file.
dotenv.config();

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Authors Haven API',
    version: '1.0.0',
    description: 'Official API Documentation for Authors Haven',
  },
  host: `${process.env.HOST_URL}`,
  basePath: '/',
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ['./**/routes/*.js'], // pass all in array
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: 'auto',
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// enable morgan logs only in development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(express.json());

// serve swagger
app.get('/doc', (req, res) => {
  res.send(swaggerSpec);
});

// API routes
app.use('/api/v1', router);

// Handling unavailable routes
app.all('*', (req, res) =>
  res.status(405).json({
    error: 'Method not allowed',
  }),
);

const port = process.env.PORT || 3000;
// finally, let's start our server...
if (!module.parent) {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

export default app;
