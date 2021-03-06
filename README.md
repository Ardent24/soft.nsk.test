# webpack-assebly

## :fire: Особенности
* используется [Webpack](https://webpack.js.org/) для сборки JavaScript-модулей
* используется транспайлер [Babel](https://babeljs.io/) для поддержки современного JavaScript (ES6) в браузерах
* используется препроцессор [Less](http://lesscss.org/)
* используется режим dev (режим разработки)
* используется режим build (режим продакшн)

## :hammer_and_wrench: Установка
* установите [NodeJS](https://nodejs.org/en/) (если требуется) и [Yarn](https://yarnpkg.com/en/docs/install)
* скачайте необходимые зависимости: ```yarn``` || ```npm install```
* чтобы начать работу, введите команду: ```yarn dev```  || ```npm run dev``` (режим разработки)
* чтобы собрать проект, введите команду ```yarn build``` || ```npm run build``` (режим продакшн)
* чтобы запустить локальный сервер ```yarn serve``` || ```npm run serve``` (режим автообновления)

## :open_file_folder: Файловая структура

```
webpack-asseblyr
├── dist
├── src
│   ├── fonts
│   ├── img
│   ├── components
│   ├── styles
├── postcc.config.js
├── webpack.config.js
├── package.json
├── .babelrc.js
└── .gitignore
```

* Корень папки:
    * ```.babelrc.js``` — настройки Babel
    * ```.gitignore``` – запрет на отслеживание файлов Git'ом
    * ```webpack.config.js``` — настройки Webpack
    * ```package.json``` — список зависимостей
    * ```postcss.config.js``` — настройка автопрефиксов в CSS
* Папка ```src``` - используется во время разработки:
    * шрифты: ```src/fonts```
    * изображения: ```src/img```
    * less(css)-файлы: ```src/styles```
* Папка ```dist``` - папка, которая копируется на сервер (запуск ```yarn run dev```)

### Страница проекта
* главная страница: ```src/index.html```

### Шрифты
* шрифты находятся в папке ```src/fonts```
    * используйте [форматы](https://caniuse.com/#search=woff) ```.woff``` и ```.woff2```

### Изображения
* изображения находятся в папке ```src/img``` 
    * в режиме продакшен происходит минифицкация

### Сторонние библиотеки
* все сторонние библиотеки устанавливаются в папку ```node_modules```
* все сторонние библиотеки:
    ```javascript
    import $ from "jquery";
    ```

## :envelope: Контакты
* ВКонтакте: [@barsukovad24](https://vk.com/barsukovad24)
* Telegram: [@bars24](https://t-do.ru/@bars24)