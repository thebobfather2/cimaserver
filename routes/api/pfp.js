const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { MongoClient } = require('mongodb');

const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // set the directory to which files should be uploaded

// configure MongoDB connection
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
let db;

client.connect().then(() => {
  db = client.db('mydb');
}).catch(err => {
  console.log(err);
});

// define POST endpoint
router.post('/picture', verifyToken, upload.single('picture'), (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const collection = db.collection('pictures');
      const newPicture = {
        username: authData.username,
        filename: req.file.filename,
        contentType: req.file.mimetype
      };
      collection.insertOne(newPicture).then(() => {
        res.status(201).json({
          message: 'Picture uploaded successfully'
        });
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    }
  });
});

// middleware function to verify JWT token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
