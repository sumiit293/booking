const router = require("express").Router();
const Train = require("./../../model/Train");

//@route  POST api/train
//@desc   
//@access Public
router.post("/", async (req, res) => {

    try {
        const { name, startPoint, endPoint } = req.body;
        const listOfTrain = await Train.find();
        if(listOfTrain.length == 0){
            const newTrain = new Train({name,startPoint,endPoint});
            const saved = await newTrain.save();
            res.status(200).json(saved);
        }else{
            res.status(409).json({error: "Train allready exits ."})
        }
        
    } catch (error) {
        res.status(500).json({ error: "internal server Error" });
    }
})

//@route  GET api/train
//@desc list of all train
//@access Public
router.get("/", async (req, res) => {
    try {
        const listOfTrain = await Train.find();
        res.status(200).json(listOfTrain);
    } catch (error) {
        res.status(500).json({ error: "internal server Error" });
    }
})

module.exports = router