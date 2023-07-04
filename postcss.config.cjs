/* eslint-disable @typescript-eslint/no-var-requires */
const postcssPresetEnv = require("postcss-preset-env");

const config = {
  plugins: [
    postcssPresetEnv({
      stage: 2,
      features: {
        "nesting-rules": true,

        // For some unknown reason, "cascade-layers" polyfill doesn't get applied to svelte component css,
        // (even though other polyfills like "nesting-rules" do get applied just fine???)
        // which means that css from svelte components will always have the lowest specificity possible.
        // Besides, css @layer has 90% global browser support anyway, so let's just use it without the polyfill.
        "cascade-layers": false,
      },
    }),
  ],
};

module.exports = config;
