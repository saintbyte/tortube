#TORTUBE
RU: Во времена когда удаляют видео с ютуба, 
когда все стали слишком нежными чтобы смотреть
в лицо реальности каждый может поднять свой 
маленький ютуб в сети TOR и быть свободным от 
общественного мнения.

EN: Small template for your own youtube in tor 

###Установка
1. Склонировать из гитхаба git clone git@github.com:saintbyte/tortube.git
2. Собрать ffmpeg c поддержкой H264 
Примерно так:  ./configure --enable-gpl --enable-nonfree --enable-version3 --enable-libwavpack --enable-libvpx --enable-libmp3lame --enable-libx264
3. Поставить зависимости: cd  tortube && npm install
4. Настроить подключение к базе в файле config/config.js
5. Сделать DEBUG=development ENV=development ./node_modules/.bin/sequelize db:migrate
6. Запустите веб-сервис как вам больше нравить в продакшен или для запуска в режиме разработки:
DEBUG=development ENV=development ./node_modules/.bin/nodemon bin/www
7. Ужаснуться шаблонам по умолчанию и начать делать свои. Логотип - я так быть сделал 
8. Прислать мне немного эфирок на 0xa301fe584ea0a9c5f58d241c6c90b61a10d18c21

###INSTALL
1. Clone repo from github git clone git@github.com:saintbyte/tortube.git
2. Make ffmpeg with support h264 . Some like that ./configure --enable-gpl --enable-nonfree --enable-version3 --enable-libwavpack --enable-libvpx --enable-libmp3lame --enable-libx264
3. Install deps: cd  tortube && npm install
4. Setup database connection in file config/config.js
5. Run DEBUG=development ENV=development ./node_modules/.bin/sequelize db:migrate
6. Run web DEBUG=development ENV=development ./node_modules/.bin/nodemon bin/www
7. Be afraid about default templates
8. Send me some ethereum to 0xa301fe584ea0a9c5f58d241c6c90b61a10d18c21

