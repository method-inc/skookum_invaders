module.exports = {
  local: {
    files: [{
      src: 'app/styles/main.styl',
      dest: '.tmp/styles/main.css'
    }]
  },
  dist: {
    files: [{
      src: 'app/styles/main.styl',
      dest: 'dist/styles/main.css'
    }]
  }
};