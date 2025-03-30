const mix = require('laravel-mix');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');
const path = require('path');
const del = require('del');

mix.setPublicPath('dist');

// Очистка папки dist перед сборкой
del.sync(['dist/**', '!dist']);

// Компиляция JS и SCSS
mix.js('src/js/app.js', 'js')
   .sass('src/sass/app.scss', 'css');

// Копирование всех HTML-файлов
fs.readdirSync('src').forEach(file => {
    if (file.endsWith('.html')) {
        mix.copy(`src/${file}`, `dist/${file}`);
    }
});

// Копирование остальных ресурсов
mix.copyDirectory('src/images', 'dist/images')
   .copyDirectory('src/webfonts', 'dist/webfonts');
   
mix.options({
    processCssUrls: false
});

// Очистка `dist` перед сборкой
mix.webpackConfig({
    cache: false, // Отключение кэширования Webpack
    plugins: [new CleanWebpackPlugin()]
});

// Включаем BrowserSync для автоматического обновления браузера
mix.browserSync({
    proxy: false,  
    server: 'dist', 
    files: ['dist/**/*.{html,js,css}'], 
    open: true, 
    notify: false,
    middleware: function (req, res, next) {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        next();
    }
});