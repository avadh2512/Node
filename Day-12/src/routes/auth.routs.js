const express = require("express")
const userModel = require("../models/user.model")

const authRouter = express.Router()


authRouter.post("/register", async (req, res) => {
    const { email, name, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({email})
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User Already Exists"
        })
    }

    const user = await userModel.create({
        email, password, name
    })

    res.status(201).json({
        message: "user Register Successfully",
        user
    })
})



module.exports = authRouter