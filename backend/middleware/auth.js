const jwt = require("jsonwebtoken");

module.exports = (request, res, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,"mySecretKey");
    const connectedUserId = decodedToken.userId;
    const connectedUserRole = decodedToken.role;
    const authorId = request.body.userId;

    const isAdmin = connectedUserRole === "admin";
    const isAuthor = authorId && authorId === connectedUserId;
    const isUser = connectedUserRole === "user";

    if (isUser || isAuthor || isAdmin) {
      next();
    } else {
      throw "The user's token is not valid";
    }
  } catch (error) {
    res.status(401).json({ error: error ? error : "Request not authenticated" });
  }
};
