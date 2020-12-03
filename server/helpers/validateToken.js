const APIError = require("./APIError");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const throwAuthError = new APIError(
  "Authentication error",
  httpStatus.UNAUTHORIZED,
  true
);

/** 
 * Fetch the token from the cookie and validates it. The front end doesnt have to get the cookie explicitly ,
 * as browser automatically sets in cookie
 * @header {authorization} 
 * @cookie {token}
 */
validateToken = (req, res, next) => {
  const userJWT = req.cookies.token || req.headers.authorization;
  if (!userJWT) {
    const err = throwAuthError
    return next(err);
  } else {
    const userJWTPayload = jwt.verify(userJWT, config.jwtSecret);
    if (!userJWTPayload) {
      //Kill the token since it is invalid
      //
      const err = throwAuthError;
      return next(err);
    } else {
      const user = "admin";
      try {
        if (user === userJWTPayload.username) {
          next();
        } else {
          const err = throwAuthError;
          next(err);
        }
      } catch (err) {
        next(err);
      }
    }
  }
};

module.exports = validateToken;
