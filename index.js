import AWS from 'aws-sdk';
import fs from 'fs';
import 'dotenv/config';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const bucketName = process.env.S3_BUCKET;
const newFileNameKey = 'file1.png';
const filePath = './1.png';

const uploadFile = (filePath, bucketName, newFileNameKey) => {
  const fileStream = fs.createReadStream(filePath);

  fileStream.on('error', (err) => {
    console.log('File Error: ', err);
  });

  const params = {
    Bucket: bucketName,
    Key: newFileNameKey,
    Body: fileStream,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error: ', err);
    }

    if (data) {
      console.log('Success: ', data.location);
    }
  });
};

uploadFile(filePath, bucketName, newFileNameKey);
