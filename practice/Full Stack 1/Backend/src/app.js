const express = require("express");
const app = express();
const noteModel = require("./models/note.model");
const cors = require("cors")
const path = require("path")
app.use(express.json());
app.use(cors())
app.use(express.static("./public"))

app.get("/api/notes", async (req, res) => {
    const note = await noteModel.find();
    res.status(200).json({
        messsge: "Fetch all the notes successfully",
        note,
    });
});

app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body;
    const note = await noteModel.create({ title, description });

    res.status(201).json({
        message: "Note Created Successfully",
        note,
    });
});

app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Note Deleted Successfully",
    });
});

app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;
    const note = await noteModel.findByIdAndUpdate(id, { description });

    res.status(200).json({
        message: "Note Updated Successfully",
        note,
    });
});

app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
    // res.send("This is wild card")
})

module.exports = app;
