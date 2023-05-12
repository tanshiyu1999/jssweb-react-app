const router = require("express").Router();
const pool = require("../db");
const multer = require('multer');
const crypto = require('crypto');
require("dotenv").config();
const sharp = require('sharp');
const maybe = require('../scripts/maybe')
const noDate = require('../scripts/noDate')
const isImgUrl = require('../scripts/isImgUrl')


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

        // console.log(req.body)
        if (req.body.image[0] == '') {
            req.body.image = null;
        } else {
            req.body.image = req.body.image[0];
        }
        if (req.body.image) {
            // console.log("here")
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
            req.body.imageRef = imageName
        }

        const sponsorData = [req.body.sponsorTier, req.body.sponsorName, req.body.sponsorDesc, req.body.sponsorLinkName1, req.body.sponsorUrl1, req.body.imageRef]
        const maybeSponsorData = sponsorData.map(el => maybe(el))

        console.log(maybeSponsorData)
        

        const newSponsor = await pool.query(
            "INSERT INTO sponsors (sponsor_tier, sponsor_name, sponsor_description, sponsor_link_text_1, sponsor_link_1, sponsor_logo_aws_ref) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
            maybeSponsorData
        );


        res.json(newSponsor);
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
            const imageName = req.body.logoAwsRef;
            const params = {
                Bucket: bucketName,
                Key: imageName,
                Body: buffer,
                ContentType: req.file.mimetype
            }
            const command = new PutObjectCommand(params);
            await s3.send(command);
        }



        const updateSponsorData = await pool.query(
            `UPDATE sponsors 
                SET sponsor_tier = $1,
                    sponsor_logo_aws_ref = $2,
                    sponsor_name = $3,
                    sponsor_description = $4,
                    sponsor_link_text_1 = $5,
                    sponsor_link_1 = $6
             WHERE sponsor_id = $7;`,
             [req.body.sponsorTier, req.body.logoAwsRef, req.body.sponsorName, maybe(req.body.sponsorDesc), maybe(req.body.sponsorLinkName1), maybe(req.body.sponsorUrl1), req.body.sponsorId]
        );

        res.json("updatedSponsor");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});







// // Put this bad boy into a loader
// // The data should load when the page renders hehexd
router.get("/", async (req, res) => {
    try {
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
        
        res.send(sponsorsData.rows)

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
            "DELETE FROM sponsors WHERE sponsor_id = $1", 
            [req.body.sponsorId]
        );

        res.send("Image Deleted");
    } catch (err) {
        console.error(err.message)  ;
        res.status(500).send("Server Error")
    }
})

module.exports = router;
