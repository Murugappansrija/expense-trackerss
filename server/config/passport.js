// import pkg from 'passport-jwt'
// import User from '../models/User.js';
// import dotenv from 'dotenv'
// dotenv.config()

// const JwtStrategy = pkg.Strategy;
//  const ExtractJwt = pkg.ExtractJwt;
// let opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.JWT_SECRET;

//  export default async (passport)=>{
//    await passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
//       await User.findOne(jwt_payload._id, function(err, user) {
//             if (err) {
//                 return done(err, false);
//             }
//             if (user) {
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//                 // or you could create a new account
//             }
//         });
//     }));
//  }
import * as dotenv from "dotenv";
import pkg from "passport-jwt";
import User from "../models/User.js";
const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
dotenv.config();
let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findById(jwt_payload._id, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
};
