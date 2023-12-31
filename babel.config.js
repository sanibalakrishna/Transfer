module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      [
        "@babel/plugin-transform-class-properties",
        { loose: true }, // Set "loose" mode to true
      ],
      [
        "@babel/plugin-transform-private-methods",
        { loose: true }, // Set "loose" mode to true
      ],
      [
        "@babel/plugin-transform-private-property-in-object",
        { loose: true }, // Set "loose" mode to true
      ],
    ],
  };
};
