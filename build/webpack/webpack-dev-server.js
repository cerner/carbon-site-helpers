const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const config = require("./webpack.dev.js");
const compiler = webpack(config);
const port = Number(process.env.PORT || 9992);
const server = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    noInfo: true,
    open: true,
    disableHostCheck: true,
    overlay: true,
    contentBase: "public"
});
server.listen(port, "0.0.0.0", () => {
    console.log(`Server started. Please go to http://localhost:${port}`);
});
