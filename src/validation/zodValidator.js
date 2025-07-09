export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      console.log("req.body", typeof req.body);
      schema.parse(req.body);
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors,
      });
    }
  };
};
