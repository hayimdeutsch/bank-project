export const authenticateAdmin = function (req, res, next) {
  if (req.email === process.env.ADMIN_EMAIL) {
    next();
  } else {
    res.status(403).json({msg: "Access denied"})
  }
}