const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const config = require('../utils/config');
const fs = require('fs');

// Configure the AWS SDK
AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-1',
});

const s3 = new AWS.S3();

// Upload a file to S3
const uploadToS3 = (file, programme_id) => {
  // const fileName = `${uuidv4()}_${file.originalname}`;
  const fileName = file.originalname;
  const filePath = `programmes/${programme_id}/display_image/${fileName}`;
  const fileBuffer = fs.readFileSync(file.path);

  const uploadParams = {
    Bucket: 'menteemeet',
    Key: filePath,
    Body: fileBuffer,
  };
  
  return new Promise((resolve, reject) => {
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error(err);
        return reject(false);
      }
  
      const fileUrl = data.Location;
      // Delete temp uploaded file
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
        }
        console.log('File deleted:', file.path);
      });
      return resolve({ filePath, fileUrl });
    });
  })
};

// Get a file from S3
const getFileFromS3 = (req, res) => {
  const fileName = req.params.filePath;

  const downloadParams = {
    Bucket: 'menteemeet',
    Key: fileName,
  };

  s3.getObject(downloadParams, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve file from S3' });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', data.ContentType);
    return res.send(data.Body);
  });
};

// Delete a file from S3
const deleteFromS3 = (req, res) => {
  const fileName = req.params.fileName;

  const deleteParams = {
    Bucket: 'your-bucket-name',
    Key: fileName,
  };

  s3.deleteObject(deleteParams, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete file from S3' });
    }

    return res.status(200).json({ message: 'File deleted from S3' });
  });
};

module.exports = { uploadToS3, getFileFromS3, deleteFromS3 };
