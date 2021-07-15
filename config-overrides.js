module.exports = {
  webpack: function (config) {
    config.module.rules.forEach(
      (e) =>
        Array.isArray(e.oneOf) &&
        e.oneOf.forEach(
          (e) =>
            Array.isArray(e.use) &&
            e.use.forEach((el) => {
              if (el.loader && el.loader.includes("sass-loader"))
                el.options.prependData = `@import "styles/lib.scss";`;
            })
        )
    );
    return config;
  },
};
