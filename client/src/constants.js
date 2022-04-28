const configs = {
  development: {
    SERVER_URI: "http://localhost:8080/api",
  },
  production: {
    SERVER_URI: "https://csarmiento-fullstack-portfolio.herokuapp.com",
  },
};

module.exports.config = configs[process.env.NODE_ENV];
