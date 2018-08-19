/**
 * Created by sb on 13.08.18.
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'tmp/uploads/'});
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const models  = require('../models');

const findVideoStreamIFile = (arr) => {
    for(let item in arr)  {
        if (arr[item]['codec_type'] === 'video') {
            return arr[item];
        }
    }
    return false;
};

const uploadError = (req,res,reason) => {
    let ctx = {};
    ctx['error'] = reason;
    fs.unlink(req.file.path, (err) => {});
    return res.render('upload_complete', ctx);
};

router.post('/', upload.single('video'), (req, res, next) => {
    let ctx = {'request': req};
    let title = req.body.title ?  req.body.title : "";
    console.log(title);
    if (req.file && req.file.mimetype === 'video/mp4') {
        ffmpeg(req.file.path)
            .input(req.file.path)
            .ffprobe(0, (err, data) => {
                if (err) return uploadError(req,res,"Нет видео в файле. Не удалось получить данные о потоках")
                console.log('file1 metadata:');

                const video_stream_in_file = findVideoStreamIFile(data['streams']);
                if (!video_stream_in_file)   {
                   return uploadError(req,res,"Нет видео в файле. Нет потока с видео")
                }
                console.dir( video_stream_in_file );
                const duration = parseInt(parseFloat(data['format']['duration']),10);
                let screen_time = '00:00:01';
                if (duration === 1) screen_time = '00:00:00';
                if (duration > 1) screen_time = '00:00:01';
                if (duration > 30) screen_time = '00:00:10';
                if (duration > 120) screen_time = '00:00:30';
                const thumbler = require('../utils/my-video-thumb');
                thumbler.extract(req.file.path, 'static/video/' + req.file.filename + '.png',  screen_time, false, (error, stdout, stderr) => {
                    if (error) return uploadError(req,res,"Нет видео в файле. Не удалось получить превью");
                    console.log('snapshot saved to snapshot.png (200x125) with a frame at 00:00:01');
                    fs.rename(req.file.path, 'static/video/' + req.file.filename + '.mp4', (err) => {
                        if (err) throw err;
                    });
                });
                models.Video.create({
                    video_uid: req.file.filename,
                    title: title,
                    width: video_stream_in_file['width'],
                    height: video_stream_in_file['height'],
                    duration: duration
                });
            });
        /*
              .then(() => User.findOrCreate({where: {username: 'fnord'}, defaults: {job: 'something else'}}))
            .spread((user, created) => {
                console.log(user.get({
                    plain: true
                }))
                console.log(created)

                /*
                In this example, findOrCreate returns an array like this:
                [ {
                    username: 'fnord',
                    job: 'omnomnom',
                    id: 2,
                    createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
                    updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
                  },
                  false
                ]
                The array returned by findOrCreate gets spread into its 2 parts by the "spread" on line 69, and the parts will be passed as 2 arguments to the callback function beginning on line 69, which will then treat them as "user" and "created" in this case. (So "user" will be the object from index 0 of the returned array and "created" will equal "false".)

            }) */





    }
    else {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) throw err;
            });
        }
        console.log('Else');
        return uploadError(req,res,"Мы принимаем только mp4 файлы")
    }
    res.render('upload_complete', ctx);
});


router.get('/',  (req, res) => {
    let ctx = {'request': req};
    res.render('upload', ctx);
});

module.exports = router;
