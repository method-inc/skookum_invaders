module.exports = {
  local: {
    files: [{
      expand: true,
      dot: true,
      cwd: 'app',
      dest: '.tmp',
      src: [
        'images/**',
        'sounds/**'
      ]}
    ]
  },
  scripts: {
    files: [{
      expand: true,
      dot: true,
      cwd: 'app',
      dest: '.tmp',
      src: [
        'scripts/*.js'
      ]}
    ]
  },
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: 'app',
      dest: 'dist',
      src: [
        'images/**',
        'sounds/**'
      ]}
    ]
  }
};