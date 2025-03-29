const mix = require('laravel-mix');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');
const path = require('path');

mix.setPublicPath('dist');

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

// Очистка `dist` перед сборкой
mix.webpackConfig({
    plugins: [new CleanWebpackPlugin()]
});

// Включаем BrowserSync для автоматического обновления браузера
mix.browserSync({
    proxy: false,  
    server: 'dist', 
    files: ['dist/**/*.{html,js,css}'], 
    open: true, 
    notify: false 
});

// Оптимизация для продакшена
if (mix.inProduction()) {
    mix.version();
    mix.options({ terser: { extractComments: false } });
}