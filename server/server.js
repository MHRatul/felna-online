require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Passport Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        google_id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
      };

      // Check if user exists in DB, if not, insert
      db.query(
        'SELECT * FROM users WHERE google_id = ?',
        [user.google_id],
        (err, results) => {
          if (err) return done(err);
          if (results.length === 0) {
            db.query(
              'INSERT INTO users (google_id, name, email, picture) VALUES (?, ?, ?, ?)',
              [user.google_id, user.name, user.email, user.picture],
              (err) => {
                if (err) return done(err);
                return done(null, user);
              }
            );
          } else {
            return done(null, results[0]);
          }
        }
      );
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Google Auth Routes
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign({ user: req.user }, 'your_jwt_secret', {
      expiresIn: '1h',
    });
    res.cookie('token', token, { httpOnly: true }).redirect('http://localhost:3000/dashboard');
  }
);

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  req.logout(() => res.redirect('/'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
