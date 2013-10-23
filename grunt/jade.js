module.exports = {
  local: {
    files: [{
      expand: true,
      cwd: 'app/',
      src: ['index.jade'],
      dest: '.tmp/',
      ext: '.html'
    }]
  },
  dist: {
    files: [{
      expand: true,
      cwd: 'app/',
      src: ['index.jade'],
      dest: 'dist/',
      ext: '.html'
    }]
  }
};