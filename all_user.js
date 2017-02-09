var express = require("express");
var router = express.Router();
var connection = require("../conf/db");

router.get("/", function (req, res, next) {
    var page = req.query.page;
    connection("select * from users limit " + (page - 1) * 10 + ", 10", function (err, rows, fields) {
        console.log(rows);
        res.jsonp(rows);
    })
});
module.exports = router;
