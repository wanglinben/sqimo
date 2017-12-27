const webpack = require('webpack');

module.exports = {
        entry: __dirname + "/public/src/main.js", //已多次提及的唯一入口文件
        output: {
            path: __dirname + "/public/build",
            filename: "[name].js"
        },
        devtool: 'eval-source-map',
        module: {
            rules: [{
                    test: /(\.jsx|\.js)$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "env", "react"
                            ]
                        }
                    },
                    exclude: /node_modules/
                },
                {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                    ]
                }
            ]
        },
        plugins: [
        ]
};
