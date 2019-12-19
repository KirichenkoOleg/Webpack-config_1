
const path = require('path'); //установили модуль (path), затем импортируем он устанавливает привильные пути
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const CopyPlugin = require('copy-webpack-plugin');//Копирует отдельные файлы или целые каталоги, которые уже существуют, в каталог сборки.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// перед сборкой очищает конечную папку

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),//изм. итоговую папку
        filename: 'js/main.js',//изменить итоговое имя файла
        publicPath: 'dist/' //относительная ссылка на js файл для браузера /livereload/
    },
    devServer: {
        overlay: true, //выводит сообщение об ошибке
    },
    module: {
        rules: [
            //rules - Массив правил, которые соответствуют запросам при создании модулей. 
            // Эти правила могут изменить способ создания модуля. 
            // Они могут применять загрузчики к модулю или изменять синтаксический анализатор.
            {
                test: /\.js$/, 
                loader: 'babel-loader',
                // exclude: '/node_modules/'
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name:'[name].[ext]',//эта конструкция что бы файл не поменял свое имя
                            outputPath: './img/',//путь сохранится обработанный файл
                            useRealivePath: true,//исп. относительный путь: да
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            pngquant: {
                                quality: [0.65, 0.80],//размер файла / его качество
                                speed: 4,//Скорость 10 имеет на 5% более низкое качество, но примерно в 8 раз быстрее, чем по умолчанию
                            }
                        }
                    }
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'css/style.css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
    ]
};
// module.exports = conf;

//------------настраиваем режим работы webpack
module.exports = (env, options) => {
    let mode = options.mode === 'production';// проверяем режим зборки по свойству объекта /conf/
    // console.log( mode );
    // conf.devtool = mode ? 'source-map' : 'eval-sourcemap';//будет доступен source-map
    //для девелоп режима все в один файл, для продакшен режима карта кода вынесется в отдельный файл
    
    conf.devtool = mode ? false : 'eval-sourcemap';// карта кода будет доступна только в development режиме сорки, в production режиме в браузере будет отображен только необработанный минифицированый(по желанию)

    return conf;
};


// ----------------------------------------------------------------------------1:32:00