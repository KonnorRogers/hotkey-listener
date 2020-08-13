module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        targets: "defaults",
        corejs: 3
      },
    ],
  ],
};
