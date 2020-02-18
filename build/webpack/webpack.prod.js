const path = require("path");

module.exports = {
    mode: "production",
    bail: true,
    entry: ["src/App.js"],
    output: {
        path: path.join(process.cwd(), "dist"),
        filename: "[name].js",
        library: "Carbon",
        libraryExport: "default",
        libraryTarget: "umd"
    },
    resolve: {
        modules: [process.cwd(), "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [path.join(__dirname, "../..", "src")],
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
                test: /\.(png|svg|gif|jpg|jpeg)$/,
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
