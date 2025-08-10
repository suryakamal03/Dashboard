// token.js

const jwt = require('jsonwebtoken');

// This function takes a user's ID as an argument.
const generateToken = (id) => {
  // jwt.sign() is the function that creates the token.
  // It takes three arguments:
  return jwt.sign(
    // 1. The Payload: The data you want to store in the token.
    //    We are storing the user's unique ID.
    { id }, 

    // 2. The Secret Key: This is the secret password from your .env file
    //    that the server uses to sign the token. Only the server knows this.
    process.env.JWT_SECRET, 

    // 3. The Options: Here we can set an expiration time.
    //    This token will be valid for 30 days.
    // {
    //   expiresIn: '30d',
    // }
  );
};

module.exports = generateToken;
