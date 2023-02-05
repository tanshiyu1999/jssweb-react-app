const router = require("express").Router();
const pool = require("../db");
const multer = require('multer');
const crypto = require('crypto');
require("dotenv").config();
const sharp = require('sharp');

const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
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
        // console.log("req.body", req.body);
        // console.log("---------------------------------------")
        // console.log("req.file", req.file);

        // resize image
        const buffer = await sharp(req.file.buffer).resize({ height: 1080, width: 1080, fit:"contain" }).toBuffer();

        const imageName = randomImageName()
        const params = {
            Bucket: bucketName,
            Key: imageName,
            Body: buffer,
            ContentType: req.file.mimetype,
        }

        const command = new PutObjectCommand(params);
        await s3.send(command);

        const newSubclub = await pool.query(
            "INSERT INTO subclubs (subclub_name, subclub_url, subclub_desc, subclub_img) VALUES ($1, $2, $3, $4) RETURNING *", 
            [req.body.name, req.body.url, req.body.desc, imageName]
        );
        

        res.json(newSubclub);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/", async (req, res) => {
    try {
        const subclubs = await pool.query("SELECT * FROM subclubs");
        // console.log(subclubs.rows)

        for (const subclub of subclubs.rows) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: subclub.subclub_img,
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            subclub.imageUrl = url;
        }
        
        res.send(subclubs.rows)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;
