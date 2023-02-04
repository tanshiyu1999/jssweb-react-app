const router = require("express").Router();
const pool = require("../db");
const multer = require('multer');
const authorization = require("../middleware/authorization");


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
upload.single('subclub-img')

router.post("/", async (req, res) => {
    try {
        console.log(`req.body: ${req.body}`);
        res.send({})
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});


module.exports = router;