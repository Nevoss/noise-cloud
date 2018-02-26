
let mix = require('laravel-mix');
let tailwindcss = require('tailwindcss');


mix
    .react('resources/assets/js/app.js', 'public/js')
    .copyDirectory('resources/assets/images', 'public/images')
    .copyDirectory('resources/assets/fonts', 'public/fonts')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false,
        postCss: [ tailwindcss('./tailwind.js') ],
    });
