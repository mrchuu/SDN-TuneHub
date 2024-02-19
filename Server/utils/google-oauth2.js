import passport from "passport";
import dotenv from "dotenv";
import { AuthenticateRepository } from "../repository/index.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Correct import statement

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "479543517442-pa6khc7q1frk7tgq4spu7tuqndvl10kn.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:9999/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        const existingUser = await AuthenticateRepository.getUserByEmail(
          profile._json.email
        );
        if (existingUser) {
          const { createdAt, updatedAt, ...filteredUser } = existingUser;
          done(null, filteredUser);
        } else {
          done(null, { error: "Email not found, consider signing up" });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
