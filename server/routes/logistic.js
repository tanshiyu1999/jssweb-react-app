const router = require("express").Router();
const pool = require("../db");
const multer = require('multer');
const crypto = require('crypto');
require("dotenv").config();
const sharp = require('sharp');
const maybe = require('../scripts/maybe')
const noDate = require('../scripts/noDate')

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


// Uploading data into the website
router.post("/", upload.single('image'), async (req, res) => {
    try {
        // console.log(req.body);
        if (req.body.image[0] == '') {
            req.body.image = null;
        } 
        
        if (req.body.image) {
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
            req.body.image = imageName
        }


        const logData = [req.body.name, req.body.logType, req.body.desc, req.body.location, req.body.quantity, "Available", req.body.image]
        const maybeLogData = logData.map(el => maybe(el))
        

        const newLogistic = await pool.query(
            "INSERT INTO logistic (logistic_name, logistic_type, logistic_description, logistic_location, logistic_quantity, logistic_status, logistic_img) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
            maybeLogData
        );

        res.json(newLogistic);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.patch("/", upload.single('image'), async (req, res) => {
    try {
        // console.log(req.body)
        if (req.body.image != "") {
            const buffer = await sharp(req.file.buffer).resize({ height: 1080, width: 1980, fit:"contain", background: "transparent" }).toBuffer();
            const imageName = req.body.logisticImg
            const params = {
                Bucket: bucketName,
                Key: imageName,
                Body: buffer,
                ContentType: req.file.mimetype
            }
            const command = new PutObjectCommand(params);
            await s3.send(command);
        }



        const updateLogistic = await pool.query(
            `UPDATE logistic 
             SET logistic_name = $1,
                 logistic_description = $2,
                 logistic_location = $3,
                 logistic_quantity = $4,
                 logistic_status = $5,
                 logistic_img = $6,
                 logistic_borrowed_by = $7,
                 logistic_borrow_from = $8,
                 logistic_borrow_to = $9
             WHERE logistic_id = $10;`,
             [req.body.name, req.body.desc, req.body.location, req.body.quantity, req.body.status, req.body.logisticImg, req.body.borrowedBy, noDate(req.body.borrowFrom), noDate(req.body.borrowTo), req.body.logisticId]
        );


        res.json(updateLogistic);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Put this bad boy into a loader
// The data should load when the page renders hehexd
router.get("/", async (req, res) => {
    try {
        const logisticData = await pool.query("SELECT * FROM logistic");
      

        for (const logistic of logisticData.rows) {
            if (!(logistic.logistic_img == '')) {
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: logistic.logistic_img,
                }
                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                logistic.imageUrl = url;
            }
        }
        
        res.send(logisticData.rows)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.delete("/", async (req, res) => {
    try {
        console.log(req.body)
        if (req.body.url != '') {
            const params = {
                Bucket: bucketName,
                Key: req.body.url,
            }
            const command = new DeleteObjectCommand(params);
            await s3.send(command);
        }


        await pool.query(
            "DELETE FROM logistic WHERE logistic_id = $1", 
            [req.body.logisticId]
        );

        res.send("Image Deleted");
    } catch (err) {
        console.error(err.message)  ;
        res.status(500).send("Server Error")
    }
})

module.exports = router;



        // CREATE TABLE logistic (
        //   logistic_id SERIAL PRIMARY KEY,
        //   logistic_name VARCHAR(100),
        //   logistic_type VARCHAR(50),
        //   logistic_description TEXT,
        //   logistic_location TEXT,
        //   logistic_quantity INT,
        //   logistic_status TEXT,
        //   logistic_borrowed_by VARCHAR(100),
        //   logistic_borrow_from DATE,
        //   logistic_borrow_to DATE,
        //   logistic_img TEXT
        // );