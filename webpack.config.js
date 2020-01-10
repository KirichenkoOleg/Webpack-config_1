
const path = require('path'); //установили модуль (path), затем импортируем он устанавливает привильные пути
const HtmlWebpackPlugin = require('html-webpack-plugin');//обработка html файла
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');//Копирует отдельные файлы или целые каталоги, которые уже существуют, в каталог сборки.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// перед сборкой очищает конечную папку

// const PATH = {
//     //более простой доступ к путям с помощю глобальных переменных
//     src: path.join(__dirname, './src'),
//     dist: path.join(__dirname, './dist'),
//     accets: 'accets/',
// };

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),//изм. итоговую папку
        filename: 'js/main.js',//изменить итоговое имя файла
        //publicPath: 'dist/', //относительная ссылка на js файл для браузера /livereload/
        publicPath: '/' //в случае когда html перенесен в src/index.html
    },
    devServer: {
        //contentBase: './dist',//в случае когда html перенесен в src/index.html и отвечает за то где будет открываться webpack
        contentBase: path.join(__dirname, './dist'),// равнозначное решение как и на пред. строке
        overlay: true,
    },
    module: {
        rules: [
            //rules - Массив правил, которые соответствуют запросам при создании модулей. 
            // Эти правила могут изменить способ создания модуля. 
            // Они могут применять загрузчики к модулю или изменять синтаксический анализатор.
            {
                test: /\.js$/, 
                loader: 'babel-loader',
                //exclude: '/node_modules/', //что-то, что не должно обрабатываться
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../', //влияет на путь к картинкам в файлах стилей /это значение оставляет исходный путь/
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                // include: [
                    // path.resolve(__dirname, './src/img/'),
                // ],
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
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[folder]/[name].[ext]',// сохранит вложенность
                    outputPath: 'fonts/',
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',//откуда брать шаблон html
            filename: 'index.html',
            inject: false, //говорит Webpack, что не нужно встраивать ссылки на js и css файл в HTML код самостоятельно: мы сделаем всё сами вручную
        }),
        // new CopyPlugin([
            // { from: 'src/index.html', to: './' },
        // ]),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ]
};
// module.exports = conf;

//------------настраиваем режим работы webpack
module.exports = (env, options) => {
    let mode = options.mode === 'production';// проверяем режим зборки по свойству объекта /conf/
    // conf.devtool = mode ? 'source-map' : 'eval-sourcemap';//будет доступен source-map
    //для девелоп режима все в один файл, для продакшен режима карта кода вынесется в отдельный файл
    
    conf.devtool = mode ? false : 'eval-sourcemap';// карта кода будет доступна только в development режиме сорки, в production режиме в браузере будет отображен только необработанный минифицированый(по желанию)

    return conf;
};