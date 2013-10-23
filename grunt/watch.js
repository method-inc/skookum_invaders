module.exports = {
  stylus: {
    files: ['app/styles/{,*/}*.styl'],
    tasks: ['stylus:local']
  },
  jade: {
    files: ['app/{,*/}*.jade'],
    tasks: ['jade:local']
  },
  scripts: {
    files: ['app/{,*/}*.js'],
    tasks: ['copy:scripts']
  }
};