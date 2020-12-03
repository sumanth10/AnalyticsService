const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const config = require("../../config/config");
const expiration = process.env.NODE_ENV === "development" ? 1000000 : 604800000;
// sample user, used for authentication
const user = {
  username: "admin",
  password: "admin",
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  if (
    req.body.username === user.username &&
    req.body.password === user.password
  ) {
    const token = jwt.sign(
      {
        username: user.username,
      },
      config.jwtSecret
    );
    console.log("login -> token", token);
    // Sets the token as cookie and will be sent through every api call to the browser
    res.cookie("token", token, {
      expires: new Date(Date.now() + expiration),
      secure: false, // set to true if your using https
    });

    if (process.env.NODE_ENV == "test")
      return res
        .status(200)
        .send({ authenticated: true, StatusCode: 200, token: token });
    else return res.status(200).send({ authenticated: true, StatusCode: 200 });
  }

  const err = new APIError(
    "Authentication error",
    httpStatus.UNAUTHORIZED,
    true
  );
  return next(err);
}

module.exports = { login };
