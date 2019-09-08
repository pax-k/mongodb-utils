async function uploadToS3(flags) {
    const AWS = require('aws-sdk');
    const path = require('path');
    const fs = require('fs');
    AWS.config.loadFromPath(flags.credentials);
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});
    const uploadParams = {Bucket: flags.bucket, Key: '', Body: ''};
    const fileStream = fs.createReadStream(flags.file);
    fileStream.on('error', function(err) {
        console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = path.join(flags.destDir, path.basename(flags.file));
    return new Promise((resolve, reject) =>  {
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                reject(err);
            } if (data) {
                resolve(data.Location);
            }
        });
    });
}

module.exports = uploadToS3;