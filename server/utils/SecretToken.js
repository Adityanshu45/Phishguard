if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
}

const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 14 * 24 * 60 * 60,
  });
};