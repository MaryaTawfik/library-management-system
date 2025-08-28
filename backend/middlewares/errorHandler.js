// Global error handler
module.exports = (err, req, res, next) => {
  // Log full error on server
  console.error(err && (err.stack || err));

  const status = err && err.status ? err.status : 500;
  const message = err && err.message ? err.message : 'Internal server error';

  if (process.env.NODE_ENV === 'production') {
    return res.status(status).json({ message });
  }

  // In non-production return stack to help debugging
  return res.status(status).json({ message, stack: err.stack });
};
