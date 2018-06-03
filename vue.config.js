/* eslint-disable no-param-reassign */

// patching fs, otherwise project can't be built on windows machines
const realFs = require("fs");
const gracefulFs = require("graceful-fs");

gracefulFs.gracefulify(realFs);

module.exports = {
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // console.log("PLUGINS: ", config.plugins);
      config.plugins.delete("prefetch");
    } else {
      // mutate for development...
    }
    // we add this so (hopefully) don't have to add polyfills manually and bloating js files
  },
  configureWebpack: (config) => {
    // this is probably not the right way to do it, but it works.
    // FIXME: do this properly
    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks.cacheGroups.vuetify = {
        test: /[\\/]vuetify[\\/]/,
      };
    }
  },
};
