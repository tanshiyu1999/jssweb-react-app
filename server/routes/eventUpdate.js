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
})

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

router.post("/", upload.single('image'), async (req, res) => {
    try {
        // resize image
        console.log(req.body)
        const buffer = await sharp(req.file.buffer).resize({ height: 1080, width: 1080, fit:"contain", background: "transparent" }).toBuffer();

        const imageName = randomImageName()
        const params = {
            Bucket: bucketName,
            Key: imageName,
            Body: buffer,
            ContentType: req.file.mimetype,
        }

        const command = new PutObjectCommand(params);
        await s3.send(command);

        const newEvent = await pool.query(
            "INSERT INTO event (event_title, event_type, event_description, event_start_date, event_end_date, event_link, event_img) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
            [req.body.title, req.body.eventType, req.body.desc, req.body.startDate, req.body.endDate, req.body.url, imageName]
        );
        

        res.json(newEvent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.patch("/", upload.single('image'), async (req, res) => {
    try {
        if (req.body.image != "") {
            const buffer = await sharp(req.file.buffer).resize({ height: 1080, width: 1980, fit:"contain", background: "transparent" }).toBuffer();
            const imageName = req.body.aws
            const params = {
                Bucket: bucketName,
                Key: imageName,
                Body: buffer,
                ContentType: req.file.mimetype
            }
            const command = new PutObjectCommand(params);
            await s3.send(command);
        }

        console.log(req.body.title)
        console.log(req.body.aws)


        const updatedEvent = await pool.query(
            `UPDATE event 
             SET event_title = $1,
                 event_type = $2,
                 event_description = $3,
                 event_start_date = $4,
                 event_end_date = $5,
                 event_link = $6
             WHERE event_img = $7;`,
             [req.body.title, req.body.eventType, req.body.desc, req.body.startDate, req.body.endDate, req.body.url, req.body.aws] 
        );
        res.json(updatedEvent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Put this bad boy into a loader
// The data should load when the page renders hehexd
router.get("/", async (req, res) => {
    try {
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
        
        res.send(events.rows)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.delete("/", async (req, res) => {
    try {
        const params = {
            Bucket: bucketName,
            Key: req.body.url,
        }
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
        await pool.query(
            "DELETE FROM event where event_img = $1", 
            [req.body.url]
        );

        res.send("Image Deleted");
    } catch (err) {
        console.error(err.message)  ;
        res.status(500).send("Server Error")
    }
})

module.exports = router;


