import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import morgan from 'morgan';
import router from './routes';
import passport from './routes/services/passport-strategies';
import session from 'express-session';

// Create global app object
const app = express();

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
// const swaggerSpec = swaggerJSDoc({
//   swaggerDefinition,
//   apis: ['./**/routes/*.js'], // pass all in array
// });

app.use(cors());

app.use(
  session({
    secret: 'ah',
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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve swagger
app.get('/doc', (req, res) => {
  res.send(swaggerSpec);
});

// API routes
app.use('/api/v1', router);

// Handling unavailable routes
app.all('*', (req, res) =>
  res.status(405).json({ error: 'Method not allowed' }),
);

// finally, let's start our server...
if (!module.parent) {
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${server.address().port}`);
  });
}

export default app;
