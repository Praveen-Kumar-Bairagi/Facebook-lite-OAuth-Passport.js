var FacebookStrategy = require("passport-facebook").Strategy;
module.exports = (app, passport) => {
  const express = require("express");
  const router = express.Router();
  const app1 = express();
  app1.use(express.json());
  const knex = require("../database/db");

  var data = {};
  passport.use(
    new FacebookStrategy(
      {
        clientID: "837923440239100",
        clientSecret: "5e029497708f4e455247d14200e8adb8",
        callbackURL: "http://localhost:8013/facebook/callback",
        profileFields: ["displayName", "photos", "email"],
      },
      (accessToken, refreshToken, profile, done) => {
        // console.log(profile._json)
        data["Name"] = profile.displayName;
        data["Image"] = profile.photos[0].value;
        data["Id"] = profile._json.id;

        const data1 = {
          Name: profile._json.name,
          Image_url: profile._json.picture.data[2],
          profile_id: profile._json.id,
        };
        knex("facebook")
          .insert(data1)
          .then((data) => {
            console.log("inserted");
          });

        process.nextTick(function () {
          return done(null, profile);
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  app.get("/", (req, res) => {
    res.send('<a href="/auth/facebook">Authentication With facebook</a>');
  });
  app.get("/auth/facebook", passport.authenticate("facebook"));
  app.get(
    "/facebook/callback",
    passport.authenticate("facebook", { scope: ["profile"] }),
    (req, res) => {
      res.send(
        "<center><h1>Welcome To My Site " +
          data.Name +
          "</h1><img src=" +
          data.Image +
          "></img></center>"
      );
    }
  );
};
