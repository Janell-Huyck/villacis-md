const babelOptions = {
    presets: ["babel-preset-gatsby", '@babel/preset-react', '@babel/preset-env'],
  }
  
  module.exports = require("babel-jest").default.createTransformer(babelOptions)