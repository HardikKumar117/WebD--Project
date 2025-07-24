import { verifyToken } from '../../../../utils/tokens.js';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token && !token.startsWith("Bearer")) {
    return res.status(501).json({ message: "Token in Not Valid" });
  }

  const actualToken = token.split(" ")[1];

  const decoded = verifyToken(actualToken);
  if (!decoded) {
    console.log("auth middleware");
    return res.status(501).json({ message: "User Not Verified" });
  }
  req.user = decoded;
  next();
};
