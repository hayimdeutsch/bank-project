import { validationResult } from "express-validator";

const sendMissingFieldErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorFields = [];
    errors.array().map(err=> errorFields.push(err.path));
      return res.status(422).json({msg: "Invalid input", 'fields': errorFields});
  }
  next();
}

export default sendMissingFieldErrors;