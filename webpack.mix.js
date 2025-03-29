const mix = require('laravel-mix');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

mix.setPublicPath('dist');

// Компиляция JS и SCSS
mix.js('src/js/app.js', 'js')
    .sass('src/sass/app.scss', 'css'); // Убрали processCssUrls, он не нужен

// Копирование файлов
mix.copy('index.html', 'dist/index.html')
    .copyDirectory('src/images', 'dist/images')
    .copyDirectory('src/webfonts', 'dist/webfonts');

// Очистка `dist` перед сборкой
mix.webpackConfig({
    plugins: [new CleanWebpackPlugin()]
});

// Включаем BrowserSync для автоматического обновления браузера
mix.browserSync({
    proxy: false,  // Отключает привязку к локальному серверу Laravel
    server: 'dist', // Запускает встроенный сервер в папке dist
    files: [
        'dist/**/*.{html,js,css}' // Следит за изменениями в файлах
    ],
    open: true, // Автоматически открывает браузер
    notify: false // Отключает всплывающие уведомления
});

// Оптимизация для продакшена
if (mix.inProduction()) {
    mix.version();
    mix.options({ terser: { extractComments: false } });
}