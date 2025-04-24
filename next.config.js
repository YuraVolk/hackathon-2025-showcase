module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://hyper-ist.mooo.com:3000/:path*",
      },
    ];
  },
};
