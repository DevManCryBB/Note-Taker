const router = require("express").Router();
const db = require('../db/db.json');
const randomNum = ("uuid");
const fs = require("fs");

router.get("./notes", (req, res) => {
    return res.json(db);
});

router.post("./notes", (req,res) => {

    fs.readFile("../db/db.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ msg: "error reading db" });
        } else {
            const dataArr = JSON.parse(data);
            const newNote = {
                id: randomNum,
                title: req.body.title,
                text: req.body.text,
            };
            dataArr.push(newNote);
            fs.writeFile("../db/db.json", JSON.stringify(dataArr, null, 4), (err) => {
                if (err) {
                    return res.status(500).json({ msg: "error writing db" });
                } else {
                    return res.json(newNote)
                }
            })
        }
    })

});

module.exports = router;