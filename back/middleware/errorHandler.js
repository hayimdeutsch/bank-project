const errorHandler = (err, req, res, next) => {
  const status = err.code || 500;
  const message = err.msg || 'Internal server error';
  res.status(status).json({
      success: false,
      message: message,
  })
  console.log(err.stack);
}

export default errorHandler;
