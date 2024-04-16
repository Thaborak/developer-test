const corsOptions = {
  origin: process.env.REACT_BASE_URL || "http://localhost:3000",
};

module.exports = { corsOptions };
