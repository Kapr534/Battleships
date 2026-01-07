import * as path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: './dist',
        port: 8081,
        open: true,
        hot: true,
    },
    module: {
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                title: 'Battleship',
            }),
        ],
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};