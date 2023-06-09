'use strict'

// Картинки 600/300

const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'data.json'), 'utf-8'));

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets/[path][name][ext]"
        }
      ],
    }), 

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: "./src/index.pug",
      // title: "Книга",
      // templateParameters: {
      //   'headerContent': `not yet`,
      //   'footerContent': `
      //     <div class="d-flex">
      //       <label for="pageRange" class="form-label">Example range</label>
      //       <input type="range" class="form-range" id="pageRange" step="1">
      //     </div>
      //   `
      // }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: '@webdiscus/pug-loader',
        options: {
          data: data,
          method: 'render',
          pretty: true
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './assets/[name].[ext]',
            },
          }
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [{
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  autoprefixer
                ]
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}