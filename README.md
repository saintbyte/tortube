#TORTUBE
RU: Во времена когда удаляют видео с ютуба, 
когда все стали слишком нежными чтобы смотреть
в лицо реальности каждый может поднять свой 
маленький ютуб в сети TOR и быть свободным от 
общественного мнения.

###Установка
1. Склонировать из гитхаба
2. Собрать ffmpeg c поддержкой H264/
3. npm install
Примерно такие параметры:  --enable-gpl --enable-nonfree --enable-version3 --enable-libwavpack --enable-libvpx --enable-libmp3lame --enable-libx264
4. Настроить подключение к базе в файле config/config.js
5. Сделать DEBUG=development ENV=development ./node_modules/.bin/sequelize db:migrate
- если будете дальше разрабатывать или просто ./node_modules/.bin/sequelize db:migrate 
если просто хотите запустить.
6. Запустите веб-сервис как вам больше нравить в продакшен или для запуска в режиме разработки:
DEBUG=development ENV=development ./node_modules/.bin/nodemon bin/www