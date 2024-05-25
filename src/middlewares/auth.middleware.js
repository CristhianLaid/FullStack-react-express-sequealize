import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) res.status(401).json({ message: "No token, authorization denied" });

    jwt.verify(token, '123', (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      console.log(req.user)
      req.user = user;

      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
