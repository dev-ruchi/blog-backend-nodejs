import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  console.log("Authenicating");

  const { authorization } = req.headers;

  if (typeof authorization !== "string") {
    console.log("Token not found");
    res.status(401).json({ message: "Unauthenticated" });
  }

  // "Bearer fkfndksjnfsvnkdvsnv"

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    res.status(401).json({ message: "Unauthenticated" });
  }

  if (!token) {
    console.log("Invalid token");
    res.status(401).json({ message: "Unauthenticated" });
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthenticated" });
  }
}
