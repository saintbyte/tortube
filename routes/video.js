const express = require('express');
const router = express.Router();
const fs = require('fs');
const models  = require('../models');

router.get('/watch/', (req, res) => {
   const video_uid = req.query.v ? req.query.v :"";
   if (video_uid === "")
   {
       console.log("video_uid is empty");
       return res.render("error",{"error": "Video not found"})
   }
   models.Video.findOne({ where: { video_uid: video_uid }}).then((result) => {
       res.render("watch",{"video": result})
   });

});

router.get('/stream', (req, res) => {
    const video_uid = req.query.v ? req.query.v :"";
    const path = 'static/video/'+video_uid+'.mp4';
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunksize = (end-start)+1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});


module.exports = router;