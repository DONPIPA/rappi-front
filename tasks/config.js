var config = {
  server: {
    name: 'rappi-test',
    baseDir: './build'
  },
  source: {
    base: 'src/',
    html: 'src/*.html',
    fonts: 'src/fonts/*',
    images: 'src/images/*',
    data: 'src/data/*',
    js: {
      paths: ['src/js/*', 'src/js/**/*'],
      entries: './src/js/app.js',
      filename: 'main.js',
      exportPath: './build/js/',
      vendors: 'src/js/vendors/*.js'
    },
    scss: {
      paths: [
        'src/sass/*.scss',
        'src/sass/**/*.scss',
        '!src/sass/vendors/*.scss'
      ],
      base: 'src/sass/base.scss',
      exportPath: './build/css/'
    }
  }
};


module.exports = config;
