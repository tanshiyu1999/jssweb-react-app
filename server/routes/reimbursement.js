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
        if (req.body.image[0] == '') {
            req.body.image = null;
        } else {
            req.body.image = req.body.image[0];
        }
        if (req.body.image) {
            console.log("here")
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

        const receiptData = [req.body.receiptRef, req.body.reimburseTo, req.body.item, req.body.purpose, req.body.cost, req.body.quantity, req.body.remark, req.body.imageRef]
        const maybeReceiptDtata = receiptData.map(el => maybe(el))
        

        const newReimbursement = await pool.query(
            "INSERT INTO reimbursement (reimbursement_receipt_ref, reimbursement_to, reimbursement_item, reimbursement_purpose, reimbursement_cost, reimbursement_quantity, reimbursement_remark, reimbursement_aws_ref) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
            maybeReceiptDtata
        );


        res.json(newReimbursement);
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
            const imageName = req.body.aws_ref;
            const params = {
                Bucket: bucketName,
                Key: imageName,
                Body: buffer,
                ContentType: req.file.mimetype
            }
            const command = new PutObjectCommand(params);
            await s3.send(command);
        }



        const updateReimbursement = await pool.query(
            `UPDATE reimbursement 
             SET reimbursement_receipt_ref = $1,
                 reimbursement_to = $2,
                 reimbursement_item = $3,
                 reimbursement_purpose = $4,
                 reimbursement_cost = $5,
                 reimbursement_quantity = $6,
                 reimbursement_remark = $7
             WHERE reimbursement_id = $8;`,
             [req.body.receiptRef, req.body.reimburseTo, req.body.item, req.body.purpose, maybe(req.body.cost), req.body.quantity, req.body.remark, req.body.reimbursementId]
        );

        console.log("wat")



        res.json(updateReimbursement);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.patch("/reimburse", async (req, res) => {
    try {
        // console.log(req.body);

        const reimbursing = await pool.query(
            `UPDATE reimbursement 
             SET reimbursement_reimbursed = true
             WHERE reimbursement_id = $1;`,
             [req.body.reimbursementId]
        );


        res.json(reimbursing);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});





// Put this bad boy into a loader
// The data should load when the page renders hehexd
router.get("/", async (req, res) => {
    try {
        const reimbursementData = await pool.query("SELECT * FROM reimbursement");
      

        for (const reimbursement of reimbursementData.rows) {
            if (!(reimbursement.reimbursement_aws_ref == '')) {
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: reimbursement.reimbursement_aws_ref,
                }
                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                reimbursement.imageUrl = url;
            }
        }
        
        res.send(reimbursementData.rows)

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
            "DELETE FROM reimbursement WHERE reimbursement_id = $1", 
            [req.body.reimbursementId]
        );

        res.send("Image Deleted");
    } catch (err) {
        console.error(err.message)  ;
        res.status(500).send("Server Error")
    }
})

module.exports = router;
