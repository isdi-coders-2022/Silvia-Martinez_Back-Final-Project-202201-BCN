const auth = (req, res, next) => {
  const id = "6229e96755f8ba1575827e9d";
  req.userId = id;
  next();
};

module.exports = auth;
