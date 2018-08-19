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
        if (item['codec_type'] !== 'video') {
            return item;
        }
    }
    return false;
};

const uploadError = (req,res,reason) => {
    let ctx = {};
    ctx['error'] = reason;
    return res.render('upload_complete', ctx);
};
router.post('/', upload.single('video'), (req, res, next) => {
    console.log(req);
    let ctx = {'request': req};
    if (req.file.mimetype === 'video/mp4') {
        const thumbler = require('../utils/my-video-thumb');

        ffmpeg(req.file.path)
            .input(req.file.path)
            .ffprobe(0, (err, data) => {
                if (err) throw err;
                console.log('file1 metadata:');
                console.dir(data);
                let video_stream_in_file = findVideoStreamIFile(data['streams']);
                if (!video_stream_in_file)   {
                   return uploadError(req,res,"Нет видео в файле")
                }

                thumbler.extract(req.file.path, 'static/video/' + req.file.filename + '.png', '00:00:01', false, (error, stdout, stderr) => {
                    console.log('snapshot saved to snapshot.png (200x125) with a frame at 00:00:01');
                });
            });
        /*
        models.Video.create(
            video_uid:  req.file.filename,
            title: '',
            width: ,
            height: DataTypes.INTEGER,
            duration: parsInt(parseFloat(data['streams']['format']['duration']),10)
        )
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
        /*
        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
        });

        fs.rename(req.file.path, 'static/video/' + req.file.filename + '.mp4', (err) => {
            if (err) throw err;
        });
        */
    }
    else {
        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
        });
        return uploadError(req,res,"Мы принимаем только mp4 файлы")
    }
    res.render('upload_complete', ctx);
});


router.get('/',  (req, res) => {
    let ctx = {'request': req};
    res.render('upload', ctx);
});

module.exports = router;
