/* eslint-disable no-param-reassign */

// patching fs, otherwise project can't be built on windows machines
const realFs = require("fs");
const gracefulFs = require("graceful-fs");

gracefulFs.gracefulify(realFs);

module.exports = {
  chainWebpack: (config) => {
    // we add this so (hopefully) don't have to add polyfills manually and bloating js files
    config.module
      .rule("js")
      .include
      .add("vuetify");
  },
  configureWebpack: (config) => {
    // this is probably not the right way to do it, but it works.
    // FIXME: do this properly
    if (config.optimization) {
      config.optimization.splitChunks.cacheGroups.vuetify = {
        test: /[\\/]vuetify[\\/]/,
      };
    }
  },
};
