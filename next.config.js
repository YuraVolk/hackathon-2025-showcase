module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://volunteers-backend.onrender.com/:path*",
      },
    ];
  },
};
