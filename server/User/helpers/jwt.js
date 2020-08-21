const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

function encode(payload) {
  let access_token = jwt.sign(
    {
      id: payload.id,
      email: payload.email,
    },
    secret
  );

  return access_token;
}

module.exports = encode;
