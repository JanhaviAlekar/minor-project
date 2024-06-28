import express from "express"
import cors from "cors"
import connnectDB from "./db.js";
import authroute from "./authroute.js"

connnectDB();


const app= express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authroute);
app.get("/", (req, res) => {
    res.send({
        message: "welcome to food app"
    })
})

app.get("/test", (req, res) => {
    res.send({
        message: "welcome to test"
    })
})

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
})
