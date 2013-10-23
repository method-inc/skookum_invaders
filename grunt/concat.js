var componentFiles = ["app/scripts/components/lodash/dist/lodash.min.js",
                      "app/scripts/components/easeljs/lib/easeljs-0.7.0.min.js"];

module.exports = {
  dist: {
    files: [{
      src: componentFiles,
      dest: "dist/scripts/libs.js"
    }]
  },
  local: {
    files: [{
      src: componentFiles,
      dest: ".tmp/scripts/libs.js"
    }]
  }
};