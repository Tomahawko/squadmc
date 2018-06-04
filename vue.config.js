/* eslint-disable no-param-reassign */

// patching fs, otherwise project can't be built on windows machines
const realFs = require("fs");
const gracefulFs = require("graceful-fs");
const GitRevisionPlugin = require("git-revision-webpack-plugin");

const gitPlugin = new GitRevisionPlugin({ branch: true });

gracefulFs.gracefulify(realFs);


module.exports = {
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // console.log("PLUGINS: ", config.plugins);
      config.plugins.delete("prefetch");
    }

    config.plugin("define").tap((args) => {
      args[0]["process.env.git"] = {
        VERSION: JSON.stringify(gitPlugin.version()),
        HASH: JSON.stringify(gitPlugin.commithash()),
        BRANCH: JSON.stringify(gitPlugin.branch()),
      };
      return args;
    });
  },
  configureWebpack: (config) => {
    // this is probably not the right way to do it, but it works.
    // FIXME: do this properly
    if (process.env.NODE_ENV === "production") {
      config.optimization.splitChunks.cacheGroups.vuetify = {
        test: /[\\/]vuetify[\\/]/,
      };

      // remove console prints
      config.optimization.minimizer[0].options.uglifyOptions.compress.drop_console = true;
    }
  },
};
