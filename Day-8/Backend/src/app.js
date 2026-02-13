const express = require("express")
const noteModel = require("./models/note.model")
const app = express()
const cors = require("cors")
app.use(cors());
app.use(express.json())

app.post("/api/notes", async (req, res) => {
    const { title, discription } = req.body

    const note = await noteModel.create({
        title, discription
    })
    res.status(201).json({
        message: "Note created Successfully", note
    })

})

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Note fetched successfully", notes
    })
})


app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully"
    })
})


app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    const { discription } = req.body
     await noteModel.findByIdAndUpdate(id, { discription })

    res.status(200).json({
        message: "Updated"
    })
})

module.exports = app;