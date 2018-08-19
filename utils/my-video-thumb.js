const exec = require('child_process').exec;

module.exports = {
    extract: (path, destPath, time = '00:00:01', size, callback) => {
        let cmd = 'ffmpeg -ss ' + time + ' -i "' + path +
            '" -y  -vframes 1 -f image2 "' + destPath +'"';
        if (size) {
            cmd = cmd + ' -s ' + size + ' ';
        }
        console.log(cmd);
        exec(cmd, (error, stdout, stderr) => {
                if (callback) {
                    callback(error, stdout, stderr);
                }
            }
        );
    }
};