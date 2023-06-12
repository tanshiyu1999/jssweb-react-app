const router = require("express").Router();
const pool = require("../db");
const multer = require('multer');
const crypto = require('crypto');
require("dotenv").config();
const sharp = require('sharp');

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
});

// Put this bad boy into a loader
// The data should load when the page renders hehexd
router.get("/", async (req, res) => {
    try {

      /* ----- EVENT DATA START ----- */
      const events = await pool.query("SELECT * FROM event");
      for (const event of events.rows) {
          const getObjectParams = {
              Bucket: bucketName,
              Key: event.event_img,
          }
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          event.imageUrl = url;
      }
      /* ----- EVENT DATA END ----- */

      /* ----- SPONSOR DATA START ----- */
      const sponsorsData = await pool.query("SELECT * FROM sponsors");

      for (const sponsor of sponsorsData.rows) {
          if (!(sponsor.sponsor_logo_aws_ref == '')) {
              const getObjectParams = {
                  Bucket: bucketName,
                  Key: sponsor.sponsor_logo_aws_ref,
              }
              const command = new GetObjectCommand(getObjectParams);
              const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
              sponsor.imageUrl = url;
          }
      }
      /* ----- SPONSOR DATA END ----- */

      

      /* ----- SUBCLUBS DATA START ----- */

      const subclubs = await pool.query("SELECT * FROM subclubs");

      for (const subclub of subclubs.rows) {
          const getObjectParams = {
              Bucket: bucketName,
              Key: subclub.subclub_img,
          }
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          subclub.imageUrl = url;
      }
      /* ----- SUBCLUBS DATA END ----- */
      res.send({eventsData: events.rows, sponsorsData: sponsorsData.rows, subclubsData: subclubs.rows})

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;


