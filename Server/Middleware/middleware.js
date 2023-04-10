function errorMiddleware(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      console.error(err.stack);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
}

module.exports = errorMiddleware;
