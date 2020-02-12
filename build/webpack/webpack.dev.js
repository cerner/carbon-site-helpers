const path = require("path");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    bail: true,
    entry: [
        `webpack-dev-server/client?http://localhost:9992/`,
        "./dev/index.js"
    ],
    output: {
        path: path.join(process.cwd(), "dist"),
        filename: "index.js",
        publicPath: "/dist"
    },
    resolve: {
        modules: [process.cwd(), "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.join(__dirname, "../..", "src"),
                    path.join(__dirname, "../..", "dev")
                ],
                loader: "babel-loader",
                options: {
                    presets: [
                        ["@babel/preset-env", { modules: false }],
                        ["@babel/preset-react", { modules: false }]
                    ],
                    plugins: [
                        ["@babel/plugin-proposal-class-properties"],
                        ["@babel/plugin-transform-classes", { loose: true }],
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                helpers: true,
                                regenerator: true
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.svg$/,
                loader: "@svgr/webpack"
            },
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                loader: "url-loader"
            },
            {
                test: /\.(css|less)$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    },
    stats: {
        colors: true,
        errorDetails: true,
        chunks: false,
        entrypoints: false,
        chunkModules: false,
        chunkOrigins: false,
        modules: false,
        warnings: false
    }
};
