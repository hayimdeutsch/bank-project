export const authenticateAdmin = function (req, res, next) {
  if (req.body.email === process.env.ADMIN_EMAIL) {
    next();
  } else {
    res.status(403).json({msg: "Access denied"})
  }
}