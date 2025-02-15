const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mysql = require("mysql");
require("dotenv").config();

// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Configure Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails, photos } = profile;
      const email = emails[0].value;
      const photo = photos[0].value;

      // Check if user exists in database
      connection.query(
        "SELECT * FROM users WHERE google_id = ?",
        [id],
        (err, results) => {
          if (err) return done(err);

          if (results.length > 0) {
            return done(null, results[0]); // User exists
          } else {
            // Insert new user
            const newUser = {
              google_id: id,
              name: displayName,
              email: email,
              profile_picture: photo,
            };

            connection.query("INSERT INTO users SET ?", newUser, (err) => {
              if (err) return done(err);
              return done(null, newUser);
            });
          }
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.google_id);
});

passport.deserializeUser((id, done) => {
  connection.query("SELECT * FROM users WHERE google_id = ?", [id], (err, results) => {
    if (err) return done(err);
    done(null, results[0]);
  });
});

module.exports = passport;
