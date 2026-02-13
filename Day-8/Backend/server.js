require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/databse")


connectToDB();
app.listen(5000, () => {
    console.log("server started on port 5000");

})