const path = require('path')
const config = {
  projectName: 'myApp',
  date: '2019-7-5',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        [
          'env',
          {
            modules: false,
          },
        ],
      ],
      plugins: ['transform-decorators-legacy', 'transform-class-properties', 'transform-object-rest-spread'],
    },
  },
  defineConstants: {},
  alias: {
    '@store': path.resolve(__dirname, '..', 'src/store'),
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@lib': path.resolve(__dirname, '..', 'src/lib'),

    '@assets': path.resolve(__dirname, '..', 'src/assets'),
    '@entities': path.resolve(__dirname, '..', 'src/entities'),
    '@http': path.resolve(__dirname, '..', 'src/http'),

    '@pages': path.resolve(__dirname, '..', 'src/pages'),
    '@styles': path.resolve(__dirname, '..', 'src/styles'),

    '@dataPool': path.resolve(__dirname, '..', 'src/dataPool'),
    '@decorator': path.resolve(__dirname, '..', 'src/decorator'),
    '@config': path.resolve(__dirname, '..', 'src/config'),

    '@container': path.resolve(__dirname, '..', 'src/container'),
    '@application': path.resolve(__dirname, '..', 'src/application'),
  },
  copy: {
    patterns: [],
    options: {},
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
          },
        },
        pxtransform: {
          enable: true,
          config: {},
        },
        url: {
          enable: true,
          config: {
            limit: 10240, // 设定转换尺寸上限
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'assets',
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
    },
  },
}

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
