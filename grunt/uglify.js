module.exports = {
  options: {
    mangle: true,
    compress: true,
    beautify: false
  },
  build: {
    files: [{
      src: "app/scripts/*.js",
      dest: "dist/scripts/app.js"
    }]
  }
};