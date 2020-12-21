const express = require("express")
const db = require("./data/config")

const router = express.Router()

router.get("/", async (req, res, next)=> {
    try{
        const cars = await db.select("*")
            .from("cars")
            res.json(cars)

    }
    catch(err){
        next(err)
    }
})

router.get("/:id" , async (req, res, next)=> {
    try{

        const cars = await db
            .select("*")
            .from("cars")
            .where("id", req.params.id)
            .limit(1)

        res.json(cars)
     }
    catch(err){
        next(err)
    }
})

router.post("/", async (req, res, next)=> {
    try{
        newCar = {
            VIN: req.body.VIN,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage
        }

        if(!newCar.VIN){
            return res.status(404).json({
                message: "VIN field is required"
            })
        }
        if(!newCar.make){
            return res.status(404).json({
                message: "Make field is required"
            })
        }
        if(!newCar.model){
            return res.status(404).json({
                message: "Model field is required"
            })
        }
        if(!newCar.mileage){
            return res.status(404).json({
                message: "mileage field is required"
            })
        }

        const [id] = await db
            .insert(newCar)
            .into("cars")

        const car = await db
            .select("*")
            .from("cars")
            .where("id",id)
        
        res.status(201).json(car)

    }
    catch(err){
        next(err)
    }
})


router.put("/:id", async (req, res, next)=> {
    try{

        const change = {
            VIN: req.body.VIN,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage,
            color: req.body.color,
            title: req.body.title
        }

        await db("cars")
            .where("id", req.params.id)
            .update(change)

        const changed = await db
            .select("*")
            .from("cars")
            .where("id", req.params.id)    

        res.json(changed)

    }
    catch(err){
        next(err)
    }
})

router.delete("/:id", async (req, res, next)=> {
    try{
        await db("cars")
            .where("id", req.params.id)
            .del()
        res.status(204).end()

    }
    catch(err){
        next(err)
    }
})

module.exports = router;