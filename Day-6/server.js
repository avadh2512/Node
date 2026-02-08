const { default: mongoose } = require("mongoose");
const app = require('./src/app')



const mogoose = require("mongoose")

function connectToDB() {
    mongoose.connect("mongodb+srv://avadh:4JlbE0heM9jTa5a0@cluster0.w06xzxi.mongodb.net/day-6").then(() => {
        console.log("connected to DB");

    });

}

connectToDB()

app.listen(3000, () => {
    console.log('server started');
})