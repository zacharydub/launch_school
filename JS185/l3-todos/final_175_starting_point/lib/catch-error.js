// wrapper for async middleware. Eliminates need to catch errors.
const catchError = handler => { //handler param is an async MW 
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};

module.exports = catchError;