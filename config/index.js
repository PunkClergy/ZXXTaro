import { defineConfig } from '@tarojs/cli'
import devConfig from './dev'
import prodConfig from './prod'

const path = require('path');
// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName: 'myapp',
    date: '2025-4-9',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [
      '@taro-hooks/plugin-react'
    ],
    defineConstants: {
    },
    copy: {
      patterns: [
        { from: 'src/assets/', to: 'dist/assets/' }, // 将 src/assets/ 下的文件复制到 dist/assets/
      ],
      options: {
      }
    },
    framework: 'react',
    compiler: 'webpack5',
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      webpackChain(chain) {
        chain.resolve.alias
          .set('@', path.resolve(__dirname, '..', 'src')) // 配置路径别名
          .set('@utils', path.resolve(__dirname, '..', 'src/utils')) // 工具类路径别名
          .set('@assets', path.resolve(__dirname, '..', 'src/assets')); // 资源路径别名
      },
      postcss: {
        pxtransform: {
          enable: true,
          config: {

          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    h5: {
      publicPath: '',//访问路径配置
      staticDirectory: 'static',
      webpackChain(chain) {
        chain.resolve.alias
          .set('@', path.resolve(__dirname, '..', 'src')) // 配置路径别名
          .set('@utils', path.resolve(__dirname, '..', 'src/utils'))
          .set('@assets', path.resolve(__dirname, '..', 'src/assets'));
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      esnextModules: ['taro-ui'],

      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
