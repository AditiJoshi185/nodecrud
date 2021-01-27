const AWS                         = require('aws-sdk');

const config = require('./../config/index');

AWS.config.s3 = { accessKeyId: config.default.s3.ACCESS_KEY_ID, secretAccessKey: config.default.s3.SECRET_ACCESS_KEY, region : config.default.s3.REGION };

async function uploadImages3(fileStream, fileType, fileName) {
    var s3 = new AWS.S3();
    let bucketName = config.default.s3.BUCKET;
    let absolutePath = 'images/'+fileName;
    if(!(fileStream && fileType)){
      throw new Error('Invalid function arguments');
    }
    var params = {
      Bucket: bucketName,
      Key: absolutePath,
      Body: fileStream,
      ACL: 'public-read',
      ContentType: fileType
    };
    const s3FileUploadData = await s3.putObject(params).promise();
    return s3FileUploadData;
}

exports.uploadImages3 = uploadImages3;