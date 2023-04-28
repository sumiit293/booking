const router = require("express").Router();
const Train = require("./../../model/Train");
const Coach = require("./../../model/Coach");
const Seat = require("./../../model/Seat");
const { request } = require("express");


//@route  GET api/booking/prepare
//@desc list of all train
//@access Public
router.get("/prepare", async (req, res) => {
    try {
        const listOfTrain = await Train.find();
        const listOfCoach = await Coach.find();
        const listOfSeat = await Seat.find();

        if(listOfCoach.length == 1 && listOfTrain.length == 1){
            if(listOfSeat.length == 0){
                for(let i = 1; i <= 80; i++){
                    const coachId = listOfCoach[0]._id;
                    const seat = new Seat({coachId,seatNumber:i});
                    await seat.save();
                }
            }
        }
        res.status(200).json((await Seat.find()));
    } catch (error) {
        res.status(500).json({ error: "internal server Error" });
    }
})

router.get("/reset", async (req, res) => {
    try {
        const listOfSeat = await Seat.find();
        for(const seat of listOfSeat){
            if(seat.isAvailable == false){
                await Seat.findByIdAndUpdate(seat._id,{
                    isAvailable: true
                })
            }
        }
        res.status(200).json((await Seat.find()));
    } catch (error) {
        res.status(500).json({ error: "internal server Error" });
    }
})

router.post("/", async (req, res) => {
    try {
        const { numOfSeat } = req.body;
        const listOfSeat = await Seat.find();
        const remainingSeat = listOfSeat.reduce((total,seat)=> {
            if(seat.isAvailable){
                return total + 1;
            }else{
                return total;
            }
        },0);
        const sortedSeatList = listOfSeat.sort((a,b)=>a.number - b.number);
        if(numOfSeat >= 8){
            res.status(400).json({error: "Max of 7 seat per user only !"});
        }else if(remainingSeat < numOfSeat){
            res.status(400).json({error: "Insufficient seats available !"});
        }else{
            let count = numOfSeat;
            for(let seat of sortedSeatList){
                if(count == 0) break;
                if(seat.isAvailable){
                    count--;
                    await Seat.findByIdAndUpdate(seat._id,{isAvailable: false});
                }
            }
            res.status(200).json((await Seat.find()));
        }
    } catch (error) {
        res.status(500).json({ error: "internal server Error" });
    }
})

module.exports = router