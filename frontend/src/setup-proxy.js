const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const isLocalhost = process.env.NODE_ENV === "development";

  app.use(
    createProxyMiddleware("/api", {
      target: isLocalhost
        ? "http://127.0.0.1:5000"
        : "https://affederation.net/",
      ws: true,
      changeOrigin: true,
    })
  );
};
