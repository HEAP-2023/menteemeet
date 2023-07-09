const AWS = require('aws-sdk');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const config = require('../utils/config');

// Configure the AWS SDK
AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-1',
});

const s3 = new AWS.S3();
const upload = multer({ dest: 'temp/' });

// Upload a file to S3
const uploadToS3 = (req, res) => {
  const file = req.file;
  const fileName = `${uuidv4()}_${file.originalname}`;

  const uploadParams = {
    Bucket: 'your-bucket-name',
    Key: fileName,
    Body: file.buffer,
  };

  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to upload file to S3' });
    }

    const fileUrl = data.Location;
    return res.status(200).json({ fileName, fileUrl });
  });
};

// Get a file from S3
const getFileFromS3 = (req, res) => {
  const fileName = req.params.fileName;

  const downloadParams = {
    Bucket: 'your-bucket-name',
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
