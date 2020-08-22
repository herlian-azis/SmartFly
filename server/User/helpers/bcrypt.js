const bcrypt = require("bcrypt");
const saltRounds = 8;

function hashPassword(newPassword) {
  const hash = bcrypt.hashSync(newPassword, saltRounds);
  return hash;
}

function checkPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { hashPassword, checkPassword };
