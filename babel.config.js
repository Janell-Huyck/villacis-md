module.exports = {
    presets: ['babel-preset-gatsby', '@babel/preset-react', '@babel/preset-env'],
    plugins: [
      ["@babel/plugin-proposal-private-methods", { "loose": true }],
      ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ],
  };
  