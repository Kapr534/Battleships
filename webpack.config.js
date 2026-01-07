import * as path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: './dist',
        port: 8081,
        open: true,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Battleship',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};