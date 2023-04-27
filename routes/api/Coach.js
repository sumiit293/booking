const router = require("express").Router();
const Coach = require("./../../model/Coach");

//@route  POST api/coach
//@desc   
//@access Public
router.post("/", async (req, res) => {
    try {
        const { trainId, number } = req.body;
        const listOfCoach = await Coach.find();
        if(listOfCoach.length == 0){
            const newCoach = new Coach({trainId,number});
            const saved = await newCoach.save();
            res.status(200).json(saved);
        }else{
            res.status(409).json({error: "Coach allready exits ."})
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//@route  GET api/coach
//@desc list of all train
//@access Public
router.get("/", async (req, res) => {
    try {
        const listOfCoach = await Coach.find();
        res.status(200).json(listOfCoach);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router